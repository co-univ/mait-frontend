import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	SendWinnerRequest,
	UpdateActiveParticipantsRequest,
} from "@/types";
import { controlApiClient } from "./useControlApi";

// Live Status Hooks
export const useLiveStatus = (questionSetId: number) => {
	return useQuery({
		queryKey: ["liveStatus", questionSetId],
		queryFn: () => controlApiClient.getLiveStatus(questionSetId),
		enabled: !!questionSetId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});
};

export const useStartLiveQuestionSet = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (questionSetId: number) =>
			controlApiClient.startLiveQuestionSet(questionSetId),
		onSuccess: (_, questionSetId) => {
			queryClient.invalidateQueries({
				queryKey: ["liveStatus", questionSetId],
			});
		},
	});
};

export const useEndLiveQuestionSet = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (questionSetId: number) =>
			controlApiClient.endLiveQuestionSet(questionSetId),
		onSuccess: (_, questionSetId) => {
			queryClient.invalidateQueries({
				queryKey: ["liveStatus", questionSetId],
			});
		},
	});
};

// Participants Hooks
export const useActiveParticipants = (questionSetId: number) => {
	return useQuery({
		queryKey: ["activeParticipants", questionSetId],
		queryFn: () => controlApiClient.getActiveParticipants(questionSetId),
		enabled: !!questionSetId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});
};

export const useCorrectAnswerRank = (questionSetId: number) => {
	return useQuery({
		queryKey: ["correctAnswerRank", questionSetId],
		queryFn: () => controlApiClient.getCorrectAnswerRank(questionSetId),
		enabled: !!questionSetId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});
};

export const useUpdateActiveParticipants = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			questionSetId,
			data,
		}: {
			questionSetId: number;
			data: UpdateActiveParticipantsRequest;
		}) => controlApiClient.updateActiveParticipants(questionSetId, data),
		onSuccess: (_, { questionSetId }) => {
			queryClient.invalidateQueries({
				queryKey: ["activeParticipants", questionSetId],
			});
			queryClient.invalidateQueries({
				queryKey: ["correctAnswerRank", questionSetId],
			});
		},
	});
};

export const useSendWinner = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			questionSetId,
			data,
		}: {
			questionSetId: number;
			data: SendWinnerRequest;
		}) => controlApiClient.sendWinner(questionSetId, data),
		onSuccess: (_, { questionSetId }) => {
			queryClient.invalidateQueries({
				queryKey: ["activeParticipants", questionSetId],
			});
		},
	});
};

// Question Control Hooks
export const useAllowQuestionAccess = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			questionSetId,
			questionId,
		}: {
			questionSetId: number;
			questionId: number;
		}) => controlApiClient.allowQuestionAccess(questionSetId, questionId),
		onSuccess: (_, { questionSetId }) => {
			// Refresh all related data for the question set - primarily live status and questions
			queryClient.invalidateQueries({
				queryKey: ["liveStatus", questionSetId],
			});
			queryClient.invalidateQueries({ queryKey: ["questions", questionSetId] });
			queryClient.invalidateQueries({
				queryKey: ["activeParticipants", questionSetId],
			});

			// Refresh all individual questions in this question set
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "question" &&
					query.queryKey[1] === questionSetId,
			});

			// Refresh question-specific data for this question set
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "questionScorer" &&
					query.queryKey[1] === questionSetId,
			});
		},
	});
};

export const useAllowQuestionSolve = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			questionSetId,
			questionId,
		}: {
			questionSetId: number;
			questionId: number;
		}) => controlApiClient.allowQuestionSolve(questionSetId, questionId),
		onSuccess: (_, { questionSetId }) => {
			// Refresh all related data for the question set - primarily live status and questions
			queryClient.invalidateQueries({
				queryKey: ["liveStatus", questionSetId],
			});
			queryClient.invalidateQueries({ queryKey: ["questions", questionSetId] });
			queryClient.invalidateQueries({
				queryKey: ["activeParticipants", questionSetId],
			});

			// Refresh all individual questions in this question set
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "question" &&
					query.queryKey[1] === questionSetId,
			});

			// Refresh question-specific data for this question set
			queryClient.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "questionScorer" &&
					query.queryKey[1] === questionSetId,
			});
		},
	});
};

// Question Data Hooks
export const useQuestions = (questionSetId: number) => {
	return useQuery({
		queryKey: ["questions", questionSetId],
		queryFn: () => controlApiClient.getQuestions(questionSetId),
		enabled: !!questionSetId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});
};

export const useQuestion = (questionSetId: number, questionId: number) => {
	return useQuery({
		queryKey: ["question", questionSetId, questionId],
		queryFn: () => controlApiClient.getQuestion(questionSetId, questionId),
		enabled: !!questionSetId && !!questionId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});
};

// Question Set Hooks
export const useQuestionSets = (teamId: number) => {
	return useQuery({
		queryKey: ["questionSets", teamId],
		queryFn: () => controlApiClient.getQuestionSets(teamId),
		enabled: !!teamId,
	});
};

// Question Score and Submit Records Hooks
export const useQuestionScorer = (
	questionSetId: number,
	questionId: number,
) => {
	return useQuery({
		queryKey: ["questionScorer", questionSetId, questionId],
		queryFn: () =>
			controlApiClient.getQuestionScorer(questionSetId, questionId),
		enabled: !!questionSetId && !!questionId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});
};

export const useSubmitRecords = (questionSetId: number, questionId: number) => {
	return useQuery({
		queryKey: ["submitRecords", questionSetId, questionId],
		queryFn: () => controlApiClient.getSubmitRecords(questionSetId, questionId),
		enabled: !!questionSetId && !!questionId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		staleTime: 0,
	});
};
