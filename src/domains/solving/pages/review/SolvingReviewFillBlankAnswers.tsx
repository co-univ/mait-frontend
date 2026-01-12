import SolvingAnswerFillBlank from "../../components/common/answer/SolvingAnswerFillBlank";
import useSolvingReviewFillBlankQuestion from "../../hooks/review/useSolvingReviewFillBlankQuestion";

//
//
//

interface SolvingReviewFillBlankAnswersProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const SolvingReviewFillBlankAnswers = ({
	questionSetId,
	questionId,
}: SolvingReviewFillBlankAnswersProps) => {
	const { isSubmitted, isCorrect, userAnswers, handleAnswerChange } =
		useSolvingReviewFillBlankQuestion({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const getVariation = (number: number) => {
		if (isSubmitted && isCorrect) {
			return "correct";
		}

		if (isSubmitted && !isCorrect) {
			return "incorrect";
		}

		return userAnswers.find((userAnswer) => userAnswer.number === number)
			?.answer === ""
			? "default"
			: "focused";
	};

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{userAnswers.map((answer) => (
				<SolvingAnswerFillBlank
					key={answer.number}
					readOnly={isSubmitted}
					answer={answer}
					variation={getVariation(answer.number)}
					onAnswerChange={handleAnswerChange}
				/>
			))}
		</div>
	);
};

export default SolvingReviewFillBlankAnswers;
