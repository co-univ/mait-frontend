import { useEffect } from "react";
import { apiHooks } from "@/libs/api";
import useControlParticipantStore from "../../stores/participant/useControlParticipantStore";

//
//
//

interface UseControlParticipantsInitProps {
	questionSetId: number;
}

//
//
//

/**
 * Owns store initialization for a question set's participants.
 * Must be called exactly once per question set page (e.g. the page root),
 * not from every component that needs participant data — see
 * useControlParticipants for read/write access to the initialized store.
 */
const useControlParticipantsInit = ({
	questionSetId,
}: UseControlParticipantsInitProps) => {
	const { initParticipants } = useControlParticipantStore();

	const { data, isPending: isFetchPending } = apiHooks.useQuery(
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

	//
	// Reset store when switching to a different question set, so stale
	// participants aren't shown until the new query resolves
	// biome-ignore lint/correctness/useExhaustiveDependencies: run only when questionSetId changes
	useEffect(() => {
		initParticipants(undefined, undefined);
	}, [questionSetId]);

	//
	// Initialize store with fetched data once, on mount
	// biome-ignore lint/correctness/useExhaustiveDependencies: run only when the initial fetch resolves
	useEffect(() => {
		if (data && !isFetchPending) {
			initParticipants(
				data.data?.activeParticipants,
				data.data?.eliminatedParticipants,
			);
		}
	}, [isFetchPending]);
};

export default useControlParticipantsInit;
