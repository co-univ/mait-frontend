import type { QuestionApiResponse } from "@/types";
import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentOrderAnswersProps {
	questionInfo: any | null;
}

interface Option {
	id: number;
	originOrder: number;
	content: string;
	answerOrder: number;
}

//
//
//

const SolvingQuizContentOrderAnswers = ({
	questionInfo,
}: SolvingQuizContentOrderAnswersProps) => {
	return (
		<SolvingAnswerLayout
			draggable
			answers={questionInfo.options as Option[]}
			prefix="alphabet"
		/>
	);
};

export default SolvingQuizContentOrderAnswers;
