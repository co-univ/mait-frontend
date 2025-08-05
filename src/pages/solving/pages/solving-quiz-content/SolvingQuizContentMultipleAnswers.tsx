import SolvingAnswerLayout from "@/pages/solving/layouts/SolvingAnswerLayout";

//
//
//

const SolvingQuizContentMultipleAnswers = () => {
	const answers = Array.from({ length: 4 }).map((_, index) => ({
		number: index + 1,
		value: `${index + 1}번 문제의 답변.`,
	}));

	return <SolvingAnswerLayout answers={answers} />;
};

export default SolvingQuizContentMultipleAnswers;
