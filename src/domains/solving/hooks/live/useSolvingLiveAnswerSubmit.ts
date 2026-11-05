import { useState } from "react";
import { notify } from "@/components/Toast";
import useUser from "@/hooks/useUser";
import { apiClient } from "@/libs/api";
import useSolvingLiveAnswerStore from "../../stores/live/useSolvingLiveAnswerStore";
import { solvingAnswersValidation } from "../../utils/solvingAnswersValidation";
import { solvingBuildSubmitData } from "../../utils/solvingBuildSubmitData";
import {
	clearLiveAnswerIdempotencyKeyIfMatches,
	getOrCreateLiveAnswerIdempotencyKey,
} from "../../utils/solvingLiveAnswerIdempotency";

//
//
//

interface SubmitAnswerParams {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingLiveAnswerSubmitReturn {
	submitAnswer: (params: SubmitAnswerParams) => Promise<boolean>;
	timeGap: number;
	isSubmitting: boolean;
}

//
//
//

const useSolvingLiveAnswerSubmit = (): UseSolvingLiveAnswerSubmitReturn => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [timeGap, setTimeGap] = useState(0);
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

			const submitData = structuredClone(
				solvingBuildSubmitData(userAnswers, questionType, user.id),
			);

			if (submitData.type === "MULTIPLE") {
				submitData.submitAnswers.sort((a, b) => a - b);
			} else if (submitData.type === "SHORT") {
				submitData.submitAnswers.sort();
			}

			const idempotencyKey = getOrCreateLiveAnswerIdempotencyKey({
				userId: user.id,
				questionSetId,
				questionId,
				payload: submitData,
			});

			const { data, error } = await apiClient.POST(
				"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit",
				{
					params: {
						path: {
							questionSetId,
							questionId,
						},
					},
					headers: { "Idempotency-Key": idempotencyKey },
					// biome-ignore lint/suspicious/noExplicitAny: API body type is union of different question types
					body: submitData as any,
				},
			);

			if (error) {
				const errCode = (error as { code?: unknown }).code;

				if (
					typeof errCode === "string" &&
					errCode.trim().length > 0 &&
					errCode !== "S-000"
				) {
					clearLiveAnswerIdempotencyKeyIfMatches(idempotencyKey);
				}

				switch (errCode) {
					case "QS-001":
						notify.error("풀이 불가한 문제입니다.");
						break;
					case "QS-002":
						notify.warn("참여자만 답안을 제출할 수 있습니다.");
						break;
					case "QS-003":
						notify.warn("이미 정답 처리된 문제입니다.");
						break;
					default:
						notify.error("답안 제출에 실패하였습니다.");
						break;
				}

				return false;
			}

			if (
				data?.isSuccess !== true ||
				typeof data.data?.isCorrect !== "boolean"
			) {
				notify.error("답안 제출에 실패하였습니다.");
				return false;
			}

			clearLiveAnswerIdempotencyKeyIfMatches(idempotencyKey);

			const isCorrect = data.data.isCorrect;
			const timeGap = data.data.timeGapMillis ?? 0;
			
			setSubmitResult(isCorrect);
			setTimeGap(timeGap);

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
		timeGap,
		isSubmitting,
	};
};

export default useSolvingLiveAnswerSubmit;
