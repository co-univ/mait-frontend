import SolvingAnswerLayout from "@/pages/solving/layouts/SolvingAnswerLayout";

//
//
///

const SolvingQuizContentBlankAnswer = () => {
	const answers = Array.from({ length: 2 }).map((_, index) => ({
		number: index + 1,
		value: `${index + 1}번 문제의 답변.`,
	}));

	return (
		<SolvingAnswerLayout
			readonly={false}
			answers={answers}
			prefix="number"
			placeholder="1234"
		/>
	);
};

export default SolvingQuizContentBlankAnswer;
