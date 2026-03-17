import { useEffect } from "react";
import type { ShortQuestionApiResponse } from "@/libs/types";
import SolvingAnswerShort from "../../../components/common/answer/SolvingAnswerShort";
import useSolvingQuestion from "../../../hooks/common/useSolvingQuestion";
import useSolvingLiveAnswerStore from "../../../stores/live/useSolvingLiveAnswerStore";

//
//
//

interface SolvingLiveShortAnswersProps {
	questionSetId: number;
	questionId: number;
	isDisabled: boolean;
}

//
//
//

const SolvingLiveShortAnswers = ({
	questionSetId,
	questionId,
	isDisabled,
}: SolvingLiveShortAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "LIVE_TIME",
	});

	const shortQuestion = question as ShortQuestionApiResponse | undefined;
	const answerCount = shortQuestion?.answerCount ?? 0;

	const { getUserAnswers, setUserAnswers } = useSolvingLiveAnswerStore();

	const userAnswers = getUserAnswers() as string[];

	/**
	 *
	 */
	const handleAnswerChange = (index: number, value: string) => {
		if (isDisabled) {
			return;
		}

		const newAnswers = [...userAnswers];
		newAnswers[index] = value;
		setUserAnswers(newAnswers);
	};

	/**
	 *
	 */
	const getAnswerVariation = (index: number): "default" | "focused" => {
		console.log(userAnswers, index);
		return userAnswers[index] === "" ? "default" : "focused";
	};

	//
	useEffect(() => {
		if (answerCount > 0 && userAnswers.length === 0) {
			const initialAnswers: string[] = Array.from(
				{ length: answerCount },
				() => "",
			);
			setUserAnswers(initialAnswers);
		}
	}, [answerCount, userAnswers.length, setUserAnswers]);

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{Array.from({ length: answerCount }).map((_, index) => (
				<SolvingAnswerShort
					// biome-ignore lint/suspicious/noArrayIndexKey: order of short answers is fixed
					key={index}
					readOnly={isDisabled}
					variation={getAnswerVariation(index)}
					answer={userAnswers[index] ?? ""}
					onChange={(value) => handleAnswerChange(index, value)}
				/>
			))}
		</div>
	);
};

export default SolvingLiveShortAnswers;
