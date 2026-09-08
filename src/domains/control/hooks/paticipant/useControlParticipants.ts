import { useCallback } from "react";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type { ParticipantInfoApiResponse } from "@/libs/types";
import useControlParticipantStore from "../../stores/participant/useControlParticipantStore";
import useControlSolvingQuestionSet from "../solving/useControlSolvingQuestionSet";

//
//
//

const SEND_TYPE_WORD: Record<"NEXT_ROUND" | "WINNER", string> = {
	NEXT_ROUND: "진출자",
	WINNER: "우승자",
};

interface UseControlParticipantsProps {
	questionSetId: number;
}

interface UseControlParticipantsReturn {
	activeParticipants?: ParticipantInfoApiResponse[];
	eliminatedParticipants?: ParticipantInfoApiResponse[];
	checkIsActiveParticipant: (userId: number) => boolean;
	refreshParticipants: () => void;
	handleAddActiveParticipant: (
		participant: ParticipantInfoApiResponse[],
	) => void;
	handleDeleteActiveParticipant: (
		participant: ParticipantInfoApiResponse[],
	) => void;
	handleSumbitParticipants: () => void;
	handleSubmitWinner: () => void;
	isEditing: boolean;
	isLoading: boolean;
	isMutating: boolean;
	isOngoing: boolean;
}

//
//
//

const useControlParticipants = ({
	questionSetId,
}: UseControlParticipantsProps): UseControlParticipantsReturn => {
	const {
		activeParticipants,
		eliminatedParticipants,
		isEditing,
		initParticipants,
		setActiveParticipants,
		setEliminatedParticipants,
	} = useControlParticipantStore();

	const { isPending: isFetchPending, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/live-status/participants",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
		{},
	);

	const {
		mutateAsync: submitParticipants,
		isPending: isParticipantSubmitPending,
	} = apiHooks.useMutation(
		"put",
		"/api/v1/question-sets/{questionSetId}/live-status/participants",
	);

	const { mutateAsync: submitWinner, isPending: isWinnerSubmitPending } =
		apiHooks.useMutation(
			"put",
			"/api/v1/question-sets/{questionSetId}/live-status/participants/winners",
		);

	const { mutateAsync: sendParticipants } = apiHooks.useMutation(
		"post",
		"/api/v1/question-sets/{questionSetId}/live-status/participants/send",
		{
			onSuccess: (_data, variables) => {
				notify.success(
					`${SEND_TYPE_WORD[variables.params.query.type]} 알림이 발송되었습니다.`,
				);
			},
			onError: (_data, variables) => {
				notify.error(
					`${SEND_TYPE_WORD[variables.params.query.type]} 알림 발송에 실패했습니다. 다시 시도해주세요.`,
				);
			},
		},
	);

	const { questionSet, handleQuestionSetEnd } = useControlSolvingQuestionSet({
		questionSetId,
	});

	const isOngoing = questionSet?.status === "ONGOING";

	const { confirm } = useConfirm();

	/**
	 *
	 */
	const checkIsActiveParticipant = (userId: number) => {
		return (
			activeParticipants?.some(
				(participant) => participant.userId === userId,
			) ?? false
		);
	};

	/**
	 *
	 */
	const refreshParticipants = useCallback(async () => {
		if (questionSet && questionSet.status !== "ONGOING") {
			return;
		}

		const { data: refetchedData } = await refetch();

		const fetchedActiveParticipants = refetchedData?.data?.activeParticipants;
		const fetchedEliminatedParticipants =
			refetchedData?.data?.eliminatedParticipants;

		// Update store state with fetched data
		initParticipants(fetchedActiveParticipants, fetchedEliminatedParticipants);
	}, [refetch, initParticipants, questionSet]);

	/**
	 *
	 */
	const handleAddActiveParticipant = (
		participant: ParticipantInfoApiResponse[],
	) => {
		if (!isOngoing) {
			return;
		}

		const updatedActiveParticipants = [
			...(activeParticipants ?? []),
			...participant,
		];
		const updatedEliminatedParticipants =
			eliminatedParticipants?.filter(
				(eliminated) =>
					!participant.some((active) => active.userId === eliminated.userId),
			) ?? [];

		setActiveParticipants(updatedActiveParticipants);
		setEliminatedParticipants(updatedEliminatedParticipants);
	};

	/**
	 *
	 */
	const handleDeleteActiveParticipant = (
		participant: ParticipantInfoApiResponse[],
	) => {
		if (!isOngoing) {
			return;
		}

		const updatedEliminatedParticipants = [
			...(eliminatedParticipants ?? []),
			...participant,
		];
		const updatedActiveParticipants =
			activeParticipants?.filter(
				(active) =>
					!participant.some(
						(eliminated) => eliminated.userId === active.userId,
					),
			) ?? [];

		setActiveParticipants(updatedActiveParticipants);
		setEliminatedParticipants(updatedEliminatedParticipants);
	};

	/**
	 *
	 */
	const handleSumbitParticipants = async () => {
		if (!isOngoing) {
			return;
		}

		const submitPromise = submitParticipants({
			params: {
				path: {
					questionSetId,
				},
			},
			body: {
				activeParticipants,
				eliminatedParticipants,
			},
		});

		const confirmPromise = confirm({
			title: "진출자 선정",
			description: `${activeParticipants?.length}명의 진출자를 player에게 전송하시겠습니까?`,
		});

		const [submitResponse, isConfirmed] = await Promise.all([
			submitPromise,
			confirmPromise,
		]);

		if (!isConfirmed) {
			return;
		}

		if (!submitResponse.isSuccess) {
			notify.error("진출자 선정에 실패했습니다. 다시 시도해주세요.");
		}

		sendParticipants({
			params: {
				path: {
					questionSetId,
				},
				query: {
					type: "NEXT_ROUND",
				},
			},
		});
	};

	/**
	 *
	 */
	const handleSubmitWinner = async () => {
		if (!isOngoing) {
			return;
		}

		const submitPromise = submitWinner({
			params: {
				path: {
					questionSetId,
				},
			},
			body: {
				winners: activeParticipants ?? [],
			},
		});

		const confirmPromise = confirm({
			title: "우승자 확정",
			description: `우승자 확정 시 실시간 풀이가 종료됩니다.\n${activeParticipants?.length}명의 우승자를 player에게 전송하시겠습니까?`,
		});

		const [submitResponse, isConfirmed] = await Promise.all([
			submitPromise,
			confirmPromise,
		]);

		if (!isConfirmed) {
			return;
		}

		if (!submitResponse.isSuccess) {
			notify.error("우승자 선정에 실패했습니다. 다시 시도해주세요.");

			return;
		}

		await sendParticipants({
			params: {
				path: {
					questionSetId,
				},
				query: {
					type: "WINNER",
				},
			},
		});

		handleQuestionSetEnd({ skipConfirm: true });
	};

	return {
		activeParticipants,
		eliminatedParticipants,
		checkIsActiveParticipant,
		refreshParticipants,
		handleAddActiveParticipant,
		handleDeleteActiveParticipant,
		handleSumbitParticipants,
		handleSubmitWinner,
		isEditing,
		isLoading: isFetchPending,
		isMutating: isParticipantSubmitPending || isWinnerSubmitPending,
		isOngoing,
	};
};

export default useControlParticipants;
