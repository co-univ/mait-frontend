import { useState } from "react";
import type { QuestionApiResponse } from "@/types";
import { apiClient } from "../../../apis/solving.api";

export const useAnswerSubmit = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const submitAnswer = async (
		questionSetId: number,
		questionInfo: QuestionApiResponse,
		userAnswers: any,
	) => {
		console.log("submitAnswer 호출됨:", {
			questionSetId,
			questionInfo,
			userAnswers,
		});

		if (!questionInfo || !userAnswers) {
			console.error("문제 정보 또는 답안이 없습니다.");
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
						userId: 1, // 추후 실제 유저 ID로 변경
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
						userId: 1, // 추후 실제 유저 ID로 변경
						type: "MULTIPLE",
						submitAnswers: Array.isArray(userAnswers) ? userAnswers : [], // 선택된 선택지 ID 배열
					};
					break;
				case "FILL_BLANK":
					submitData = {
						userId: 1, // 추후 실제 유저 ID로 변경
						type: "FILL_BLANK",
						submitAnswers: userAnswers.map((answer: any) => ({
							number: answer.number,
							answer: answer.answer,
						})),
					};
					break;
				case "ORDERING":
					submitData = {
						userId: 1, // 추후 실제 유저 ID로 변경
						type: "ORDERING",
						submitAnswers: userAnswers, // 정렬된 선택지 ID 배열
					};
					break;
				default:
					console.error("지원하지 않는 문제 타입입니다.");
					return null;
			}

			console.log("API 호출 전:", {
				questionSetId,
				questionId: questionInfo.id,
				submitData,
			});

			const response = await apiClient.postQuestionSetsQuestionsSubmit(
				questionSetId,
				questionInfo.id,
				submitData,
			);

			console.log("답안 제출 성공:", response);
			return response;
		} catch (error) {
			console.error("답안 제출 실패:", error);
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
