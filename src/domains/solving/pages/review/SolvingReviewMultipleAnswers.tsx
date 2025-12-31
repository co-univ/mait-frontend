import SolvingReviewAnswer from "../../components/review/SolvingReviewAnswer";
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
	const { isSubmitted, isCorrect, choices, userAnswers, handleChoiceChange } =
		useSolvingReviewMultipleQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const getAnswerVariation = (
		choiceNumber: number,
	): "default" | "focused" | "correct" | "incorrect" => {
		if (!isSubmitted) {
			return userAnswers.includes(choiceNumber) ? "focused" : "default";
		}

		if (isCorrect) {
			return userAnswers.includes(choiceNumber) ? "correct" : "default";
		}

		return userAnswers.includes(choiceNumber) ? "incorrect" : "default";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{choices.map((choice) => (
				<button
					key={choice.id}
					type="button"
					onClick={() => handleChoiceChange(choice.number)}
				>
					<SolvingReviewAnswer
						readOnly
						variation={getAnswerVariation(choice.number)}
						content={choice ? `${choice.number}. ${choice.content}` : ""}
					/>
				</button>
			))}
		</div>
	);
};

export default SolvingReviewMultipleAnswers;
