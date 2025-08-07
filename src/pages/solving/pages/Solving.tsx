import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

const Solving = ({ questionInfo, quizTitle, questionCount, questionSetId, isSubmitAllowed }: SolvingQuizContentProps) => {
	const [showCorrect, setShowCorrect] = useState(false);
	const [isCorrect, setIsCorrect] = useState(true);
	const [userAnswers, setUserAnswers] = useState<any>(null);
	const { submitAnswer, isSubmitting } = useAnswerSubmit();

	// 문제가 바뀔 때 userAnswers 초기화
	useEffect(() => {
		setUserAnswers(null);
	}, [questionInfo?.id]);

	const handleAnimationComplete = () => {
		const hideTimer = setTimeout(() => {
			setShowCorrect(false);
		}, 2000);

		return () => clearTimeout(hideTimer);
	};

	const handleSubmitAnswer = async () => {
		if (!questionInfo) {
			console.error("문제 정보가 없습니다.");
			return;
		}

		try {
			const response = await submitAnswer(questionSetId, questionInfo, userAnswers);
			if (response?.data) {
				setIsCorrect(response.data.isCorrect || false);
				setShowCorrect(true);
			}
		} catch(err) {
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