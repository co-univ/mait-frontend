import SolvingAnswerLayout from "../../layouts/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentOrderAnswersProps {
	questionInfo: any | null;
	userAnswers: any;
	onAnswersChange: (answers: any) => void;
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
	userAnswers,
	onAnswersChange,
}: SolvingQuizContentOrderAnswersProps) => {
	const handleOrderChange = (newOrder: any[]) => {
		const orderedIds = newOrder.map(option => option.id);
		onAnswersChange(orderedIds);
	};

	return (
		<SolvingAnswerLayout
			draggable
			answers={questionInfo.options as Option[]}
			prefix="alphabet"
			onOrderChange={handleOrderChange}
			onChoiceSelect={undefined}
		/>
	);
};

export default SolvingQuizContentOrderAnswers;
