import SolvingReviewAnswer from "../../components/review/SolvingReviewAnswer";
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
			{userAnswers.map(({ number, answer }) => (
				<div key={number} className="flex gap-gap-9 items-center">
					<span className="typo-heading-small">({number})</span>
					<SolvingReviewAnswer
						readOnly={isSubmitted}
						variation={getVariation(number)}
						content={answer}
						onChange={(value) => handleAnswerChange(number, value)}
					/>
				</div>
			))}
		</div>
	);
};

export default SolvingReviewFillBlankAnswers;
