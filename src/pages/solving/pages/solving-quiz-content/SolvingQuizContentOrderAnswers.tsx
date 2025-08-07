import { useEffect, useRef, useState } from "react";
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
	const initializedRef = useRef<number | null>(null);

	// questionInfo가 변경될 때마다 초기 순서로 설정
	useEffect(() => {
		if (questionInfo?.options && questionInfo.id !== initializedRef.current) {
			setOrderedOptions([...questionInfo.options]);
			// 초기 순서를 userAnswers에도 설정
			const initialOrder = questionInfo.options.map((option: Option) => option.id);
			onAnswersChange(initialOrder);
			initializedRef.current = questionInfo.id;
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
