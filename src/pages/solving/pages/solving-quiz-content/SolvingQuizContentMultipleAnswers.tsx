import type { QuestionApiResponse } from "@/types";
import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentMultipleAnswersProps {
	questionInfo: any | null;
}

interface Choice {
	id: number;
	number: number;
	content: string;
	isCorrect: boolean;
}

//
//
//

const SolvingQuizContentMultipleAnswers = ({
	questionInfo,
}: SolvingQuizContentMultipleAnswersProps) => {
	return (
		<SolvingAnswerLayout
			prefix="number"
			answers={questionInfo.choices as Choice[]}
			readonly={true} // 객관식 보기 텍스트는 수정 불가
			draggable={false} // 보기 순서 고정(정렬형이면 true로)
		/>
	);
};

export default SolvingQuizContentMultipleAnswers;
