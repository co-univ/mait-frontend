import SolvingAnswerShort from "../../components/common/answer/SolvingAnswerShort";
import useSolvingReviewShortQuestion from "../../hooks/review/useSolvingReviewShortQuestion";

//
//
//

interface SolvingReviewShortAnswersProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const SolvingReviewShortAnswers = ({
	questionSetId,
	questionId,
}: SolvingReviewShortAnswersProps) => {
	const { isSubmitted, isCorrect, userAnswers, handleAnswerChange } =
		useSolvingReviewShortQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const getVariation = (index: number) => {
		if (isSubmitted && isCorrect) {
			return "correct";
		}

		if (isSubmitted && !isCorrect) {
			return "incorrect";
		}

		return userAnswers[index] === "" ? "default" : "focused";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{userAnswers.map((answer, index) => (
				<SolvingAnswerShort
					// biome-ignore lint/suspicious/noArrayIndexKey: order of short answers is fixed
					key={index}
					readOnly={isSubmitted}
					variation={getVariation(index)}
					answer={answer}
					onChange={(value) => handleAnswerChange(index, value)}
				/>
			))}
		</div>
	);
};

export default SolvingReviewShortAnswers;
