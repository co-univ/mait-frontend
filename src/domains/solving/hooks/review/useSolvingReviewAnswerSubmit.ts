import { useState } from "react";
import { notify } from "@/components/Toast";
import useUser from "@/hooks/useUser";
import { apiClient } from "@/libs/api";
import type { QuestionType } from "@/libs/types";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";
import { solvingAnswersValidation } from "../../utils/solvingAnswersValidation";
import { solvingBuildSubmitData } from "../../utils/solvingBuildSubmitData";

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

		const validation = solvingAnswersValidation(userAnswers, questionType);
		if (!validation.isValid) {
			notify.warn(validation.errorMessage || "답안을 입력해주세요.");
			return false;
		}

		try {
			setIsSubmitting(true);

			const submitData = solvingBuildSubmitData(
				userAnswers,
				questionType,
				user.id,
			);

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
