import SolvingAnswerMultiple from "../../components/common/answer/SolvingAnswerMultiple";
import useSolvingReviewMultipleQuestion from "../../hooks/review/useSolvingReviewMultipleQuestion";

//
//
//

interface SolvingReviewMultipleAnswersProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const SolvingReviewMultipleAnswers = ({
	questionSetId,
	questionId,
}: SolvingReviewMultipleAnswersProps) => {
	const {
		isSubmitted,
		choices,
		userAnswers,
		gradedResults,
		handleChoiceChange,
	} = useSolvingReviewMultipleQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const handleChoiceClick = (choiceNumber: number) => {
		if (isSubmitted) {
			return;
		}

		handleChoiceChange(choiceNumber);
	};

	/**
	 *
	 */
	const getAnswerVariation = (
		choiceNumber: number,
	): "default" | "focused" | "correct" | "incorrect" => {
		if (isSubmitted && gradedResults) {
			if (!userAnswers.includes(choiceNumber)) {
				return "default";
			}

			const result = gradedResults.find(
				(result) => result.number === choiceNumber,
			);

			return result?.isCorrect ? "correct" : "incorrect";
		}

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

export default SolvingReviewMultipleAnswers;
