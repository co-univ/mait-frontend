import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { QuestionApiResponse } from "@/types";
import SolvingQuizCorrect from "../components/SolvingQuizCorrect";
import SolvingLayout from "../layouts/SolvingLayout";
import SolvingQuizContent from "./solving-quiz-content";
import SolvingTopBar from "./solving-top-bar";

//
//
//

interface SolvingQuizContentProps {
	questionInfo: QuestionApiResponse | null;
}

//
//
//

const Solving = ({ questionInfo }: SolvingQuizContentProps) => {
	const [showCorrect, setShowCorrect] = useState(false);
	const [isCorrect, setIsCorrect] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowCorrect(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const handleAnimationComplete = () => {
		const hideTimer = setTimeout(() => {
			setShowCorrect(false);
		}, 2000);

		return () => clearTimeout(hideTimer);
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
			<SolvingTopBar />
			<div className="h-size-height-5" />
			<SolvingQuizContent questionInfo={questionInfo} />
		</SolvingLayout>
	);
};

export default Solving;
