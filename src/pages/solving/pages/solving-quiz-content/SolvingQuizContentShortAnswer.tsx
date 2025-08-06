import type { QuestionApiResponse } from "@/types";
import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentShortAnswerProps {
	questionInfo: any | null;
}

//
//
//

const SolvingQuizContentShortAnswer = ({
	questionInfo,
}: SolvingQuizContentShortAnswerProps) => {
	const count = questionInfo.answerCount;

	const answers = Array.from({ length: count }).map((_, index) => ({
		number: index + 1,
		value: `${index + 1}번 문제의 답변.`,
	}));

	return (
		<SolvingAnswerLayout
			readonly={false}
			answers={answers}
			placeholder="답변을 입력하세요."
		/>
	);
};

export default SolvingQuizContentShortAnswer;
