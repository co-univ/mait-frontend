import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateFillBlankQuestionApiRequest,
  CreateMultipleQuestionApiRequest,
  CreateOrderingQuestionApiRequest,
  CreateShortQuestionApiRequest,
} from "@/types";
import { apiClient } from "@/pages/creation/hooks/api";
import { QUESTION_SET_QUERY_KEYS } from "@/pages/creation/hooks/useQuestionSet";

// 문제 유형 정의 - API에서 사용되는 문제 유형들
type QuestionType = "SHORT" | "MULTIPLE" | "ORDERING" | "FILL_BLANK";

// 문제 생성 요청 데이터 유니온 타입 - 모든 문제 유형의 생성 요청을 포함
type CreateQuestionRequest =
  | CreateMultipleQuestionApiRequest
  | CreateShortQuestionApiRequest
  | CreateOrderingQuestionApiRequest
  | CreateFillBlankQuestionApiRequest;

/**
 * 문제 관련 TanStack Query 케시 키 상수
 * 문제 데이터의 케시 무효화 및 업데이트에 사용
 */
export const QUESTION_QUERY_KEYS = {
  all: ["questions"] as const,
  byQuestionSet: (questionSetId: number) =>
    ["questions", "questionSet", questionSetId] as const,
  detail: (questionSetId: number, questionId: number) =>
    ["questions", questionSetId, questionId] as const,
};

//
//
//

/**
 * 새로운 문제 생성을 위한 TanStack Query 뮤테이션 훅
 * 성공 시 관련 케시를 자동으로 무효화하여 데이터 동기화
 * @returns 문제 생성 뮤테이션 객체
 */
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionSetId,
      type,
      data,
    }: {
      questionSetId: number;
      type: QuestionType;
      data: CreateQuestionRequest;
    }) => apiClient.createQuestion(questionSetId, type, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_QUERY_KEYS.byQuestionSet(variables.questionSetId),
      });
      queryClient.invalidateQueries({
        queryKey: QUESTION_SET_QUERY_KEYS.detail(variables.questionSetId),
      });
    },
  });
};

/**
 * 기존 문제 업데이트를 위한 TanStack Query 뮤테이션 훅
 * 성공 시 관련 케시를 무효화하고 새로운 데이터로 갱신
 * @returns 문제 업데이트 뮤테이션 객체
 */
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionSetId,
      questionId,
      type,
      data,
    }: {
      questionSetId: number;
      questionId: number;
      type: QuestionType;
      data: CreateQuestionRequest;
    }) => apiClient.updateQuestion(questionSetId, questionId, type, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_QUERY_KEYS.byQuestionSet(variables.questionSetId),
      });
      queryClient.setQueryData(
        QUESTION_QUERY_KEYS.detail(
          variables.questionSetId,
          variables.questionId,
        ),
        variables.data,
      );
    },
  });
};
