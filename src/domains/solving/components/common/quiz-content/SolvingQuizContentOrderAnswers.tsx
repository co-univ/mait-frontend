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
			const options = (questionInfo.options as Option[]).sort(
				(a, b) => a.originOrder - b.originOrder,
			);

			setOrderedOptions(options);

			onAnswersChange(options.map((option) => option.originOrder));
			initializedRef.current = questionInfo.id;
		}
	}, [questionInfo]);

	// userAnswers가 null로 변경되면 초기화
	useEffect(() => {
		if (userAnswers === null && questionInfo?.options) {
			const options = (questionInfo.options as Option[]).sort(
				(a, b) => a.originOrder - b.originOrder,
			);

			onAnswersChange(options.map((option) => option.originOrder));
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
