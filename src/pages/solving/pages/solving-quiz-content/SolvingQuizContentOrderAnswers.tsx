import { useState, useEffect } from "react";
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
	const [orderedOptions, setOrderedOptions] = useState<Option[]>([]);

	// questionInfo가 변경될 때마다 초기 순서로 설정
	useEffect(() => {
		if (questionInfo?.options) {
			setOrderedOptions([...questionInfo.options]);
		}
	}, [questionInfo]);

	const handleOrderChange = (newOrder: Option[]) => {
		setOrderedOptions(newOrder);
		// userAnswers에 순서 변경된 옵션들의 ID 배열 저장
		const orderedIds = newOrder.map(option => option.id);
		onAnswersChange(orderedIds);
	};

	return (
		<SolvingAnswerLayout
			draggable
			answers={orderedOptions}
			prefix="alphabet"
			onOrderChange={handleOrderChange}
		/>
	);
};

export default SolvingQuizContentOrderAnswers;
