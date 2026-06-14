import { useParams } from "react-router-dom";
import SolvingAnswerMultiple from "@/domains/solving/components/common/answer/SolvingAnswerMultiple";
import type {
	MultipleChoiceApiResponse,
	MultipleQuestionApiResponse,
} from "@/libs/types";
import useDashboardQuestionResults from "../../hooks/question/useDashboardQuestionResults";
import useDashboardQuestions from "../../hooks/question/useDashboardQuestions";

//
//
//

const DashboardQuestionMultipleAnswers = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { targetQuestion: question } =
		useDashboardQuestions<MultipleQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { targetSolveResult: solveResult } = useDashboardQuestionResults({
		questionSetId,
		questionId,
	});

	const submitAnswer = JSON.parse(solveResult?.submittedAnswer ?? "null") as {
		submitAnswers: number[];
	} | null;

	/**
	 *
	 */
	const getAnswerVariation = (choice: MultipleChoiceApiResponse) => {
		if (choice.isCorrect) {
			return "correct";
		}

		if (submitAnswer?.submitAnswers.includes(choice.number)) {
			return "incorrect";
		}

		return "default";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{question?.choices.map((choice) => (
				<SolvingAnswerMultiple
					key={choice.id}
					choice={choice}
					onChoiceClick={() => {}}
					variation={getAnswerVariation(choice)}
				/>
			))}
		</div>
	);
};

export default DashboardQuestionMultipleAnswers;
