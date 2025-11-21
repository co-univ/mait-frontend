import { useEffect, useRef, useState } from "react";
import SolvingAnswerLayout from "../../../layouts/common/SolvingAnswerLayout";

//
//
//

interface SolvingQuizContentOrderAnswersProps {
	questionInfo: any | null;
	userAnswers: any;
	onAnswersChange: (answers: any) => void;
	isAnswered?: boolean;
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
	isAnswered = false,
}: SolvingQuizContentOrderAnswersProps) => {
	const [orderedOptions, setOrderedOptions] = useState<Option[]>([]);
	const initializedRef = useRef<number | null>(null);

	// questionInfo가 변경될 때마다 초기 순서로 설정
	useEffect(() => {
		if (questionInfo?.options && questionInfo.id !== initializedRef.current) {
			setOrderedOptions([...questionInfo.options]);
			// 초기 순서를 userAnswers에도 설정 (originOrder 배열)
			const initialOrder = questionInfo.options.map(
				(option: Option) => option.originOrder,
			);
			onAnswersChange(initialOrder);
			initializedRef.current = questionInfo.id;
		}
	}, [questionInfo]);

	// userAnswers가 null로 변경되면 초기화
	useEffect(() => {
		if (userAnswers === null && questionInfo?.options) {
			setOrderedOptions([...questionInfo.options]);
			const initialOrder = questionInfo.options.map(
				(option: Option) => option.originOrder,
			);
			onAnswersChange(initialOrder);
		}
	}, [userAnswers, questionInfo]);

	const handleOrderChange = (newOrder: Option[]) => {
		setOrderedOptions(newOrder);
		// userAnswers에 순서 변경된 옵션들의 originOrder 배열 저장
		const orderedOriginOrders = newOrder.map((option) => option.originOrder);
		onAnswersChange(orderedOriginOrders);
	};

	return (
		<SolvingAnswerLayout
			draggable={!isAnswered}
			answers={orderedOptions}
			prefix="alphabet"
			onOrderChange={isAnswered ? undefined : handleOrderChange}
			selectedChoices={userAnswers || []}
		/>
	);
};

export default SolvingQuizContentOrderAnswers;
