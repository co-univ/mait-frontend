import type { MultipleQuestionApiResponse } from "@/libs/types";
import SolvingAnswerMultiple from "@/domains/solving/components/common/answer/SolvingAnswerMultiple";
import useSolvingQuestion from "@/domains/solving/hooks/common/useSolvingQuestion";
import useSolvingStudyAnswerStore from "@/domains/solving/stores/study/useSolvingStudyAnswerStore";

//
//
//

interface SolvingStudyMultipleAnswersProps {
	questionSetId: number;
	questionId: number;
	readOnly?: boolean;
	isCorrect: boolean | null;
}

//
//
//

const SolvingStudyMultipleAnswers = ({
	questionSetId,
	questionId,
	readOnly = false,
	isCorrect,
}: SolvingStudyMultipleAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "STUDY",
	});

	const multipleQuestion = question as MultipleQuestionApiResponse | undefined;
	const choices = multipleQuestion?.choices ?? [];

	const { getUserAnswers, setUserAnswers } = useSolvingStudyAnswerStore();
	const userAnswers = getUserAnswers(questionId) as number[];

	/**
	 *
	 */
	const handleChoiceClick = (choiceNumber: number) => {
		if (readOnly) {
			return;
		}

		const newAnswers = userAnswers.includes(choiceNumber)
			? userAnswers.filter((num) => num !== choiceNumber)
			: [...userAnswers, choiceNumber];

		setUserAnswers(questionId, newAnswers);
	};

	const getAnswerVariation = (
		choiceNumber: number,
	): "default" | "focused" | "correct" | "incorrect" => {
		const selected = userAnswers.includes(choiceNumber);

		if (!selected) {
			return "default";
		}

		if (!readOnly) {
			return "focused";
		}

		return isCorrect ? "correct" : "incorrect";
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

export default SolvingStudyMultipleAnswers;
