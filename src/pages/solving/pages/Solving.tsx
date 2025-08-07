import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { notify } from "src/components/common/Toast";
import type { QuestionApiResponse } from "@/types";
import SolvingQuizCorrect from "../components/SolvingQuizCorrect";
import { useAnswerSubmit } from "../hooks/useAnswerSubmit";
import SolvingLayout from "../layouts/SolvingLayout";
import SolvingQuizContent from "./solving-quiz-content";
import SolvingTopBar from "./solving-top-bar";

//
//
//

interface SolvingQuizContentProps {
	questionInfo: QuestionApiResponse | null;
	quizTitle: string;
	questionCount: number;
	questionSetId: number;
	isSubmitAllowed: boolean;
}

//
//
//

const Solving = ({
	questionInfo,
	quizTitle,
	questionCount,
	questionSetId,
	isSubmitAllowed,
}: SolvingQuizContentProps) => {
	const [showCorrect, setShowCorrect] = useState(false);
	const [isCorrect, setIsCorrect] = useState(true);
	const [userAnswers, setUserAnswers] = useState<any>(null);
	const { submitAnswer, isSubmitting } = useAnswerSubmit();

	// 문제가 바뀔 때 userAnswers 초기화
	useEffect(() => {
		setUserAnswers(null);
	}, [questionInfo?.id]);

	// isSubmitAllowed 변경 시 로그
	useEffect(() => {
		console.log("Solving 컴포넌트 - isSubmitAllowed 상태:", isSubmitAllowed);
	}, [isSubmitAllowed]);

	const handleAnimationComplete = () => {
		const hideTimer = setTimeout(() => {
			setShowCorrect(false);
		}, 2000);

		return () => clearTimeout(hideTimer);
	};

	const validateAnswers = (): boolean => {
		if (!questionInfo) {
			notify.warn("답안을 입력해주세요");
			return false;
		}

		// 순서 정렬 문제는 userAnswers가 없어도 허용 (초기 순서로 제출)
		if (questionInfo.type === "ORDERING" && !userAnswers) {
			return true;
		}

		if (!userAnswers) {
			notify.warn("답안을 입력해주세요");
			return false;
		}

		const questionType = questionInfo.type;

		switch (questionType) {
			case "MULTIPLE":
				// 객관식: 최소 1개 이상 선택
				if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
					notify.warn("정답을 한 개 이상 선택해주세요");
					return false;
				}
				break;

			case "SHORT": {
				// 주관식: 모든 빈칸 채워야 함
				if (!Array.isArray(userAnswers)) {
					notify.warn("답안을 입력해주세요");
					return false;
				}

				// number로 그룹화된 답안 개수 확인
				const shortAnswerGroups =
					questionInfo.answers?.reduce((acc: any, answer: any) => {
						if (!acc[answer.number]) {
							acc[answer.number] = true;
						}
						return acc;
					}, {}) || {};

				const requiredShortAnswerCount = Object.keys(shortAnswerGroups).length;
				const filledShortAnswers = userAnswers.filter(
					(answer: any) =>
						answer && answer.answer && answer.answer.trim() !== "",
				);

				if (filledShortAnswers.length < requiredShortAnswerCount) {
					notify.warn("정답을 모두 입력해주세요");
					return false;
				}
				break;
			}

			case "FILL_BLANK": {
				// 빈칸 채우기: 모든 빈칸 채워야 함
				if (!Array.isArray(userAnswers)) {
					notify.warn("답안을 입력해주세요.");
					return false;
				}

				// number로 그룹화된 빈칸 개수 확인
				const blankGroups =
					questionInfo.answers?.reduce((acc: any, answer: any) => {
						if (!acc[answer.number]) {
							acc[answer.number] = true;
						}
						return acc;
					}, {}) || {};

				const requiredBlankCount = Object.keys(blankGroups).length;
				const filledBlanks = userAnswers.filter(
					(answer: any) =>
						answer && answer.answer && answer.answer.trim() !== "",
				);

				if (filledBlanks.length < requiredBlankCount) {
					notify.warn("정답을 모두 입력해주세요");
					return false;
				}
				break;
			}

			case "ORDERING":
				// 순서 정렬: 기본적으로 모든 옵션이 있어야 함 (드래그 앤 드롭으로 자동 생성되므로 별도 검증 불필요)
				break;
		}

		return true;
	};

	const handleSubmitAnswer = async () => {
		if (!questionInfo) {
			console.error("문제 정보가 없습니다.");
			return;
		}

		// 답안 검증
		if (!validateAnswers()) {
			return;
		}

		try {
			const response = await submitAnswer(
				questionSetId,
				questionInfo,
				userAnswers,
			);
			if (response?.data) {
				setIsCorrect(response.data.isCorrect || false);
				setShowCorrect(true);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<SolvingLayout>
			<AnimatePresence mode="wait">
				{showCorrect && (
					<SolvingQuizCorrect
						correct={isCorrect}
						show={showCorrect}
						onAnimationComplete={handleAnimationComplete}
					/>
				)}
			</AnimatePresence>
			<SolvingTopBar
				questionNum={questionInfo?.number as number}
				quizTitle={quizTitle}
				questionCount={questionCount as number}
				onSubmit={handleSubmitAnswer}
				isSubmitting={isSubmitting}
				isSubmitAllowed={isSubmitAllowed}
			/>
			<div className="h-size-height-5" />
			<SolvingQuizContent
				questionInfo={questionInfo}
				userAnswers={userAnswers}
				onAnswersChange={setUserAnswers}
			/>
		</SolvingLayout>
	);
};

export default Solving;