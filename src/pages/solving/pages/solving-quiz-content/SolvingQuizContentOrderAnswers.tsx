import SolvingAnswerLayout from "@/pages/solving/layouts/SolvingAnswerLayout";

//
//
//

const SolvingQuizContentOrderAnswers = () => {
	const answers = Array.from({ length: 4 }).map((_, index) => ({
		number: index + 1,
		value: `${index + 1}번 순서.`,
	}));

	return <SolvingAnswerLayout draggable answers={answers} prefix="alphabet" />;
};

export default SolvingQuizContentOrderAnswers;
