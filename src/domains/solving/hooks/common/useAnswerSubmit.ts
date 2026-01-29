import { useState } from "react";
import useUser from "src/hooks/useUser";
import Toast, { notify } from "@/components/Toast";
import { apiClient } from "@/libs/api";
import type { QuestionApiResponse } from "@/libs/types";

export const useAnswerSubmit = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useUser();

	const submitAnswer = async (
		questionSetId: number,
		questionInfo: QuestionApiResponse,
		userAnswers: any,
	) => {
		if (!questionInfo) {
			console.error("문제 정보가 없습니다.");
			return null;
		}

		// 순서 정렬 문제가 아닌 경우에만 userAnswers 체크
		if (questionInfo.type !== "ORDERING" && !userAnswers) {
			console.error("답안이 없습니다.");
			return null;
		}

		try {
			setIsSubmitting(true);
			const questionType = questionInfo.type;
			let submitData: any;

			// 문제 타입에 따라 제출 데이터 구조를 만듭니다
			switch (questionType) {
				case "SHORT":
					submitData = {
						userId: user?.id || 0,
						type: "SHORT",
						submitAnswers: userAnswers
							.filter(
								(answer: any) =>
									answer && answer.answer && answer.answer.trim() !== "",
							)
							.map((answer: any) => answer.answer),
					};
					break;
				case "MULTIPLE":
					submitData = {
						userId: user?.id || 0,
						type: "MULTIPLE",
						submitAnswers: Array.isArray(userAnswers) ? userAnswers : [], // 선택된 선택지 number 배열
					};
					break;
				case "FILL_BLANK":
					submitData = {
						userId: user?.id || 0,
						type: "FILL_BLANK",
						submitAnswers: userAnswers.map((answer: any) => ({
							number: answer.number,
							answer: answer.answer,
						})),
					};
					break;
				case "ORDERING": {
					// userAnswers가 없으면 초기 순서 사용
					const orderingAnswers =
						userAnswers ||
						(questionInfo as any).options?.map(
							(option: any) => option.originOrder,
						) ||
						[];
					submitData = {
						userId: user?.id || 0,
						type: "ORDERING",
						submitAnswers: orderingAnswers, // 정렬된 originOrder 배열
					};
					break;
				}
				default:
					console.error("지원하지 않는 문제 타입입니다.");
					return null;
			}

			// biome-ignore lint/suspicious/noExplicitAny: openapi-fetch response type is complex
			const response: any = await apiClient.POST(
				"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit",
				{
					params: {
						path: {
							questionSetId,
							questionId: questionInfo.id,
						},
					},
					body: submitData,
				},
			);

			if (response.error) {
				const errCode = (response.error as any).code;
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
			}
			return response;
		} catch (error) {
			notify.error("답안 제출에 실패하였습니다.");
			return null;
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		submitAnswer,
		isSubmitting,
	};
};
