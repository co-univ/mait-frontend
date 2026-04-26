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
}

//
//
//

const SolvingStudyMultipleAnswers = ({
	questionSetId,
	questionId,
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
		const newAnswers = userAnswers.includes(choiceNumber)
			? userAnswers.filter((num) => num !== choiceNumber)
			: [...userAnswers, choiceNumber];

		setUserAnswers(questionId, newAnswers);
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{choices.map((choice) => (
				<SolvingAnswerMultiple
					key={choice.id}
					choice={choice}
					onChoiceClick={handleChoiceClick}
					variation={userAnswers.includes(choice.number) ? "focused" : "default"}
				/>
			))}
		</div>
	);
};

export default SolvingStudyMultipleAnswers;
