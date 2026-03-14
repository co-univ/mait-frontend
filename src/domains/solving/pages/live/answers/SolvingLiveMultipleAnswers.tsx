import type { MultipleQuestionApiResponse } from "@/libs/types";
import SolvingAnswerMultiple from "../../../components/common/answer/SolvingAnswerMultiple";
import useQuestion from "../../../hooks/common/useQuestion";
import useSolvingLiveAnswerStore from "../../../stores/live/useSolvingLiveAnswerStore";

//
//
//

interface SolvingLiveMultipleAnswersProps {
	questionSetId: number;
	questionId: number;
	isDisabled: boolean;
}

//
//
//

const SolvingLiveMultipleAnswers = ({
	questionSetId,
	questionId,
	isDisabled,
}: SolvingLiveMultipleAnswersProps) => {
	const { question } = useQuestion({
		questionSetId,
		questionId,
		mode: "LIVE_TIME",
	});

	const multipleQuestion = question as MultipleQuestionApiResponse | undefined;
	const choices = multipleQuestion?.choices ?? [];

	const { getUserAnswers, setUserAnswers } = useSolvingLiveAnswerStore();

	const userAnswers = getUserAnswers() as number[];

	/**
	 *
	 */
	const handleChoiceClick = (choiceNumber: number) => {
		if (isDisabled) {
			return;
		}

		const newAnswers = userAnswers.includes(choiceNumber)
			? userAnswers.filter((num) => num !== choiceNumber)
			: [...userAnswers, choiceNumber];

		setUserAnswers(newAnswers);
	};

	/**
	 *
	 */
	const getAnswerVariation = (
		choiceNumber: number,
	): "default" | "focused" | "correct" | "incorrect" => {
		return userAnswers.includes(choiceNumber) ? "focused" : "default";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{choices.map((choice) => (
				<SolvingAnswerMultiple
					key={choice.id}
					choice={choice}
					onChoiceClick={handleChoiceClick}
					variation={getAnswerVariation(choice.number)}
				/>
			))}
		</div>
	);
};

export default SolvingLiveMultipleAnswers;
