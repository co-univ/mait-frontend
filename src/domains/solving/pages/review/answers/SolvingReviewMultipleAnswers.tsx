import type {
	GradedAnswerMultipleResult,
	MultipleQuestionApiResponse,
} from "@/libs/types";
import SolvingAnswerMultiple from "../../../components/common/answer/SolvingAnswerMultiple";
import useQuestion from "../../../hooks/common/useQuestion";
import useSolvingReviewAnswerResultStore from "../../../stores/review/useSolvingReviewAnswerResultStore";

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
	const { question } = useQuestion({
		questionSetId,
		questionId,
		mode: "REVIEW",
	});

	const multipleQuestion = question as MultipleQuestionApiResponse | undefined;
	const choices = multipleQuestion?.choices ?? [];

	const { getUserAnswers, setUserAnswers, getIsSubmitted, getIsGradedResults } =
		useSolvingReviewAnswerResultStore();

	const userAnswers = getUserAnswers(questionId) as number[];
	const isSubmitted = getIsSubmitted(questionId);
	const gradedResults = getIsGradedResults(questionId) as
		| GradedAnswerMultipleResult[]
		| null;

	/**
	 *
	 */
	const handleChoiceClick = (choiceNumber: number) => {
		if (isSubmitted) {
			return;
		}

		const newAnswers = userAnswers.includes(choiceNumber)
			? userAnswers.filter((num) => num !== choiceNumber)
			: [...userAnswers, choiceNumber];

		setUserAnswers(questionId, newAnswers);
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
