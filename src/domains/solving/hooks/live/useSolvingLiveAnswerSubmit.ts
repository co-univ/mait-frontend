import { useState } from "react";
import { notify } from "@/components/Toast";
import useUser from "@/hooks/useUser";
import { apiClient } from "@/libs/api";
import useSolvingLiveAnswerStore from "../../stores/live/useSolvingLiveAnswerStore";
import { solvingAnswersValidation } from "../../utils/solvingAnswersValidation";
import { solvingBuildSubmitData } from "../../utils/solvingBuildSubmitData";

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
	 *
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

export default useSolvingLiveAnswerSubmit;
