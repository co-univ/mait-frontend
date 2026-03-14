import { useState } from "react";
import { notify } from "@/components/Toast";
import useUser from "@/hooks/useUser";
import { apiClient } from "@/libs/api";
import type { FillBlankSubmitAnswer, QuestionType } from "@/libs/types";
import useSolvingReviewAnswerResultStore, {
	type AnswersType,
} from "../../stores/review/useSolvingReviewAnswerResultStore";
import { solvingReviewAnswersValidation } from "../../utils/solving-review-answers-validation";

//
//
//

interface SubmitAnswerParams {
	questionSetId: number;
	questionId: number;
	questionType: QuestionType;
}

interface UseSolvingReviewAnswerSubmitReturn {
	submitAnswer: (params: SubmitAnswerParams) => Promise<boolean>;
	isSubmitting: boolean;
}

//
//
//

const useSolvingReviewAnswerSubmit = (): UseSolvingReviewAnswerSubmitReturn => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useUser();

	const { getUserAnswers, setAnswerSubmitted } =
		useSolvingReviewAnswerResultStore();

	/**
	 *
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
	 *
	 */
	const submitAnswer = async ({
		questionSetId,
		questionId,
		questionType,
	}: SubmitAnswerParams): Promise<boolean> => {
		const userAnswers = getUserAnswers(questionId);

		if (!user?.id) {
			notify.error("로그인이 필요합니다.");
			return false;
		}

		const validation = solvingReviewAnswersValidation(userAnswers, questionType);
		if (!validation.isValid) {
			notify.warn(validation.errorMessage || "답안을 입력해주세요.");
			return false;
		}

		try {
			setIsSubmitting(true);

			const submitData = buildSubmitData(userAnswers, questionType, user.id);

			const { data, error } = await apiClient.POST(
				"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit/review",
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
				notify.error("답안 제출에 실패하였습니다.");
				return false;
			}

			const isCorrect = data?.data?.isCorrect ?? false;
			const gradedResults = data?.data?.gradedResults ?? [];

			setAnswerSubmitted(questionId, isCorrect, gradedResults);

			return true;
		} catch {
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

export default useSolvingReviewAnswerSubmit;
