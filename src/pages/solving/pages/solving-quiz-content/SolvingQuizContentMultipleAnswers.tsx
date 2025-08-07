import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentMultipleAnswersProps {
	questionInfo: any | null;
	userAnswers: any;
	onAnswersChange: (answers: any) => void;
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
	userAnswers,
	onAnswersChange,
}: SolvingQuizContentMultipleAnswersProps) => {
	const handleChoiceSelect = (choiceNumber: number) => {
		const currentAnswers = userAnswers || [];
		let newAnswers: number[];
		
		if (currentAnswers.includes(choiceNumber)) {
			// 이미 선택된 경우 제거
			newAnswers = currentAnswers.filter((num: number) => num !== choiceNumber);
		} else {
			// 선택되지 않은 경우 추가
			newAnswers = [...currentAnswers, choiceNumber];
		}
		
		onAnswersChange(newAnswers);
	};

	return (
		<SolvingAnswerLayout
			prefix="number"
			answers={questionInfo.choices as Choice[]}
			readonly={true} // 객관식 보기 텍스트는 수정 불가
			draggable={false} // 보기 순서 고정(정렬형이면 true로)
			onChoiceSelect={handleChoiceSelect}
			selectedChoices={userAnswers || []}
		/>
	);
};

export default SolvingQuizContentMultipleAnswers;
