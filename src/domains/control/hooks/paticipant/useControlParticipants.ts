import { useEffect } from "react";
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
	isEditing: boolean;
	isLoading: boolean;
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

	const { data, isPending } = apiHooks.useQuery(
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

	//
	//
	//
	useEffect(() => {
		if (data && !isPending) {
			const fetchedActiveParticipants = data.data?.activeParticipants;
			const fetchedEliminatedParticipants = data.data?.eliminatedParticipants;

			initParticipants(
				fetchedActiveParticipants,
				fetchedEliminatedParticipants,
			);
		}
	}, [data, isPending, initParticipants]);

	return {
		activeParticipants,
		eliminatedParticipants,
		checkIsActiveParticipant,
		handleAddActiveParticipant,
		handleDeleteActiveParticipant,
		isEditing,
		isLoading: isPending,
	};
};

export default useControlParticipants;
