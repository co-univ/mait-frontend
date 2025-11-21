import { useEffect } from "react";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type { ParticipantInfoApiResponse } from "@/libs/types";
import useControlParticipantStore from "../../stores/participant/useControlParticipantStore";

//
//
//

interface UseControlParticipantsProps {
	questionSetId: number;
}

interface UseControlParticipantsReturn {
	activeParticipants?: ParticipantInfoApiResponse[];
	eliminatedParticipants?: ParticipantInfoApiResponse[];
	checkIsActiveParticipant: (userId: number) => boolean;
	handleAddActiveParticipant: (
		participant: ParticipantInfoApiResponse[],
	) => void;
	handleDeleteActiveParticipant: (
		participant: ParticipantInfoApiResponse[],
	) => void;
	handleSumbitParticipants: () => void;
	isEditing: boolean;
	isLoading: boolean;
	isMutating: boolean;
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

	const {
		data,
		isPending: isFetchPending,
		refetch,
	} = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/live-status/participants",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const { mutate: putMutate, isPending: isParticipantSubmitPending } =
		apiHooks.useMutation(
			"put",
			"/api/v1/question-sets/{questionSetId}/live-status/participants",
			{
				onSuccess: () => {
					notify.success("다음진출자가 확정되었습니다.");
					refetch();
				},
				onError: () => {
					notify.error("다음진출자 확정에 실패했습니다. 다시 시도해주세요.");
				},
			},
		);

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
	const handleAddActiveParticipant = (
		participant: ParticipantInfoApiResponse[],
	) => {
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
		const isConfirmed = await confirm({
			title: "진출자 확정",
			description: `${activeParticipants?.length}명의 진출자를 확정하시겠습니까?`,
		});

		if (!isConfirmed) {
			return;
		}

		putMutate({
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
	};

	//
	//
	//
	useEffect(() => {
		if (data && !isFetchPending) {
			const fetchedActiveParticipants = data.data?.activeParticipants;
			const fetchedEliminatedParticipants = data.data?.eliminatedParticipants;

			initParticipants(
				fetchedActiveParticipants,
				fetchedEliminatedParticipants,
			);
		}
	}, [data, isFetchPending, initParticipants]);

	return {
		activeParticipants,
		eliminatedParticipants,
		checkIsActiveParticipant,
		handleAddActiveParticipant,
		handleDeleteActiveParticipant,
		handleSumbitParticipants,
		isEditing,
		isLoading: isFetchPending,
		isMutating: isParticipantSubmitPending,
	};
};

export default useControlParticipants;
