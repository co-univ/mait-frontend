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
	const { choices, selectedChoices, handleChoiceChange } =
		useSolvingReviewMultipleQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const getAnswerVariation = (choiceId: number): "default" | "focused" => {
		return selectedChoices.includes(choiceId) ? "focused" : "default";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{choices.map((choice) => (
				<button
					key={choice.id}
					type="button"
					onClick={() => handleChoiceChange(choice.id)}
				>
					<SolvingReviewAnswer
						readOnly
						variation={getAnswerVariation(choice.id)}
						content={choice ? `${choice.number}. ${choice.content}` : ""}
					/>
				</button>
			))}
		</div>
	);
};

export default SolvingReviewMultipleAnswers;
