import { useState } from "react";
import useUser from "@/hooks/useUser";
import { notify } from "@/components/Toast";
import { apiClient } from "@/libs/api";
import type { FillBlankSubmitAnswer, QuestionType } from "@/libs/types";
import useSolvingLiveAnswerStore, {
	type AnswersType,
} from "../../stores/live/useSolvingLiveAnswerStore";

//
//
//

interface SubmitAnswerParams {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingLiveAnswerSubmitReturn {
	submitAnswer: (params: SubmitAnswerParams) => Promise<boolean>;
	isSubmitting: boolean;
}

//
//
//

const useSolvingLiveAnswerSubmit = (): UseSolvingLiveAnswerSubmitReturn => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useUser();

	const { getUserAnswers, getQuestionType, setSubmitResult } =
		useSolvingLiveAnswerStore();

	/**
	 * 답안 검증
	 */
	const validateAnswers = (
		userAnswers: AnswersType,
		questionType: QuestionType,
	): { isValid: boolean; errorMessage?: string } => {
		switch (questionType) {
			case "MULTIPLE": {
				const answers = userAnswers as number[];
				if (answers.length === 0) {
					return { isValid: false, errorMessage: "답안을 선택해주세요." };
				}
				return { isValid: true };
			}
			case "SHORT": {
				const answers = userAnswers as string[];
				if (answers.length === 0 || answers.every((a) => a.trim() === "")) {
					return { isValid: false, errorMessage: "답안을 입력해주세요." };
				}
				return { isValid: true };
			}
			case "FILL_BLANK": {
				const answers = userAnswers as FillBlankSubmitAnswer[];
				if (answers.some((answer) => answer.answer.trim() === "")) {
					return { isValid: false, errorMessage: "답안을 입력해주세요." };
				}
				return { isValid: true };
			}
			case "ORDERING": {
				return { isValid: true };
			}
			default:
				return { isValid: false, errorMessage: "지원하지 않는 문제 타입입니다." };
		}
	};

	/**
	 * 답안 제출 데이터 생성
	 */
	const buildSubmitData = (
		userAnswers: AnswersType,
		questionType: QuestionType,
		userId: number,
	) => {
		switch (questionType) {
			case "SHORT":
				return {
					userId,
					type: "SHORT" as const,
					submitAnswers: (userAnswers as string[]).filter(
						(answer) => answer.trim() !== "",
					),
				};

			case "MULTIPLE":
				return {
					userId,
					type: "MULTIPLE" as const,
					submitAnswers: userAnswers as number[],
				};

			case "FILL_BLANK":
				return {
					userId,
					type: "FILL_BLANK" as const,
					submitAnswers: userAnswers as FillBlankSubmitAnswer[],
				};

			case "ORDERING":
				return {
					userId,
					type: "ORDERING" as const,
					submitAnswers: userAnswers as number[],
				};

			default:
				throw new Error("지원하지 않는 문제 타입입니다.");
		}
	};

	/**
	 * 답안 제출
	 */
	const submitAnswer = async ({
		questionSetId,
		questionId,
	}: SubmitAnswerParams): Promise<boolean> => {
		const userAnswers = getUserAnswers();
		const questionType = getQuestionType();

		if (!questionType) {
			console.error("문제 타입 정보가 없습니다.");
			return false;
		}

		if (!user?.id) {
			notify.error("로그인이 필요합니다.");
			return false;
		}

		// 답안 검증
		const validation = validateAnswers(userAnswers, questionType);
		if (!validation.isValid) {
			notify.warn(validation.errorMessage || "답안을 입력해주세요.");
			return false;
		}

		try {
			setIsSubmitting(true);

			const submitData = buildSubmitData(userAnswers, questionType, user.id);

			const { data, error } = await apiClient.POST(
				"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit",
				{
					params: {
						path: {
							questionSetId,
							questionId,
						},
					},
					// biome-ignore lint/suspicious/noExplicitAny: API body type is union of different question types
					body: submitData as any,
				},
			);

			if (error) {
				const errCode = (error as { code?: string }).code;
				switch (errCode) {
					case "QS-001":
						notify.error("풀이 불가한 문제입니다.");
						break;
					case "QS-002":
						notify.error("참여자만 답안을 제출할 수 있습니다.");
						break;
					case "QS-003":
						notify.error("이미 정답 처리된 문제입니다.");
						break;
					default:
						notify.error("답안 제출에 실패하였습니다.");
						break;
				}
				return false;
			}

			const isCorrect = data?.data?.isCorrect ?? false;
			setSubmitResult(isCorrect);

			return true;
		} catch (error) {
			notify.error("답안 제출에 실패하였습니다.");
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		submitAnswer,
		isSubmitting,
	};
};

export default useSolvingLiveAnswerSubmit;
