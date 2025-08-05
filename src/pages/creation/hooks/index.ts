/**
 * creation/hooks 폴더의 모든 훅과 API 클라이언트를 export하는 집계 파일
 * 다른 컴포넌트에서 간편하게 import할 수 있도록 구성
 */

// API 클라이언트 export
export { apiClient } from "@/pages/creation/hooks/api";

// 문제 관련 훅들 export
export {
  QUESTION_QUERY_KEYS,
  useCreateQuestion,
  useUpdateQuestion,
} from "@/pages/creation/hooks/useQuestion";

// 문제 세트 관련 훅들 export
export {
  QUESTION_SET_QUERY_KEYS,
  useCreateQuestionSet,
  useUpdateQuestionSet,
} from "@/pages/creation/hooks/useQuestionSet";
