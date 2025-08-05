import SolvingAnswerLayout from "@/pages/solving/layouts/SolvingAnswerLayout";

//
//
//

const SolvingQuizContentShortAnswer = () => {
	const answers = Array.from({ length: 2 }).map((_, index) => ({
		number: index + 1,
		value: `${index + 1}번 문제의 답변.`,
	}));

	return (
		<SolvingAnswerLayout answers={answers} placeholder="답변을 입력하세요." />
	);
};

export default SolvingQuizContentShortAnswer;
