import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionSetApiRequest } from "@/types";
import { apiClient } from "./api";

//
//
//

/**
 * 문제 세트 관련 TanStack Query 케시 키 상수
 * 케시 무효화 및 업데이트 시 사용되는 케시 키 정의
 */
export const QUESTION_SET_QUERY_KEYS = {
	all: ["questionSets"] as const,
	byTeam: (teamId: number) => ["questionSets", "team", teamId] as const,
	detail: (id: number) => ["questionSets", id] as const,
};

//
//
//

/**
 * 문제 세트 목록 조회를 위한 TanStack Query 훅
 * @param teamId - 조회할 팀의 ID
 * @returns 문제 세트 목록 쿼리 객체
 */
export const useQuestionSets = (teamId: number) => {
	return useQuery({
		queryKey: QUESTION_SET_QUERY_KEYS.byTeam(teamId),
		queryFn: () => apiClient.getQuestionSets(teamId),
		// enabled: !!teamId, // teamId가 있을 때만 쿼리 실행
		enabled: teamId !== undefined && teamId !== null,
	});
};

/**
 * 새로운 문제 세트 생성을 위한 TanStack Query 뮤테이션 훅
 * 성공 시 관련 코리를 자동으로 무효화하고 업데이트
 * @returns 문제 세트 생성 뮤테이션 객체
 */
export const useCreateQuestionSet = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateQuestionSetApiRequest) =>
			apiClient.createQuestionSet(data),
		onSuccess: (data) => {
			// 모든 관련 케시 무효화
			queryClient.invalidateQueries({
				queryKey: QUESTION_SET_QUERY_KEYS.all,
			});
			queryClient.invalidateQueries({
				queryKey: ["questionSets", "team"],
			});
			if (data.data?.questionSetId) {
				queryClient.setQueryData(
					QUESTION_SET_QUERY_KEYS.detail(data.data.questionSetId),
					data,
				);
			}
		},
	});
};

/**
 * 기존 문제 세트 업데이트를 위한 TanStack Query 뮤테이션 훅
 * 성공 시 관련 케시를 무효화하고 새로운 데이터로 업데이트
 * @returns 문제 세트 업데이트 뮤테이션 객체
 */
export const useUpdateQuestionSet = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			questionSetId,
			data,
		}: {
			questionSetId: number;
			data: CreateQuestionSetApiRequest;
		}) => apiClient.updateQuestionSet(questionSetId, data),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: QUESTION_SET_QUERY_KEYS.all,
			});
			queryClient.setQueryData(
				QUESTION_SET_QUERY_KEYS.detail(variables.questionSetId),
				data,
			);
		},
	});
};
