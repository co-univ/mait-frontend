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
		isEditing,
		isLoading: isPending,
	};
};

export default useControlParticipants;
