import SolvingReviewAnswer from "../../components/review/SolvingReviewAnswer";
import UseSolvingReviewShortQuestion from "../../hooks/review/useSolvingReviewShortQuestion";

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
	const { isSubmitted, isCorrect, userAnswer, handleAnswerChange } =
		UseSolvingReviewShortQuestion({
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

		return userAnswer[index] === "" ? "default" : "focused";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{userAnswer.map((answer, index) => (
				<SolvingReviewAnswer
					// biome-ignore lint/suspicious/noArrayIndexKey: order of short answers is fixed
					key={index}
					variation={getVariation(index)}
					content={answer}
					onChange={(value) => handleAnswerChange(index, value)}
				/>
			))}
		</div>
	);
};

export default SolvingReviewShortAnswers;
