import type { QuestionApiResponse } from "@/types";
import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentBlankAnswerProps {
	questionInfo: any | null;
}

interface Answer {
	id: number;
	answer: string;
	isMain: boolean;
	number: number;
}

//
//
//

const SolvingQuizContentBlankAnswer = ({
	questionInfo,
}: SolvingQuizContentBlankAnswerProps) => {
	const answers = questionInfo.answers.slice(
		0,
		questionInfo.answers.length / 2,
	);

	return (
		<SolvingAnswerLayout
			readonly={false}
			answers={answers as Answer[]}
			prefix="number"
			placeholder="빈칸에 들어갈 답안을 입력하세요."
		/>
	);
};

export default SolvingQuizContentBlankAnswer;
