import clsx from "clsx";
import { motion } from "framer-motion";
import quizCorrect from "src/assets/images/quiz-correct.png";
import quizIncorrect from "src/assets/images/quiz-incorrect.png";

//
//
//

interface SolvingSubmitResultProps {
	correct: boolean;
	show?: boolean;
	onAnimationComplete?: () => void;
}

//
//
//

const SolvingSubmitResult = ({
	correct,
	show = true,
	onAnimationComplete,
}: SolvingSubmitResultProps) => {
	if (!show) {
		return null;
	}

	return (
		<motion.div
			initial={{ y: -200, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: -200, opacity: 0 }}
			transition={{
				type: "spring",
				damping: 15,
				stiffness: 300,
				mass: 1,
				duration: 0.8,
			}}
			onAnimationComplete={onAnimationComplete}
			className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-50 pointer-events-none"
		>
			<motion.img
				src={correct ? quizCorrect : quizIncorrect}
				alt={correct ? "Quiz Success" : "Quiz Fail"}
				className="h-[95px] aspect-square"
				initial={{ scale: 0, rotate: -180 }}
				animate={{ scale: 1, rotate: 0 }}
				transition={{
					type: "spring",
					damping: 12,
					stiffness: 400,
					delay: 0.2,
				}}
			/>
			<motion.span
				className={clsx("typo-heading-xlarge", {
					"text-success-50": correct,
					"text-point-50": !correct,
				})}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: "spring",
					damping: 10,
					stiffness: 200,
					delay: 0.4,
				}}
			>
				{correct ? "정답!" : "오답!"}
			</motion.span>
		</motion.div>
	);
};

export default SolvingSubmitResult;
