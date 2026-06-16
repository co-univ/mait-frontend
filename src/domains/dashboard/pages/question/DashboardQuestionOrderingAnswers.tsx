import { useParams } from "react-router-dom";
import SolvingAnswerOrdering from "@/domains/solving/components/common/answer/SolvingAnswerOrdering";
import type { OrderingQuestionApiResponse } from "@/libs/types";
import useDashboardQuestionResults from "../../hooks/question/useDashboardQuestionResults";
import useDashboardQuestions from "../../hooks/question/useDashboardQuestions";

//
//
//

const DashboardQuestionOrderingAnswers = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { targetQuestion: question } =
		useDashboardQuestions<OrderingQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { targetSolveResult: solveResult } = useDashboardQuestionResults({
		questionSetId,
		questionId,
	});

	const options = question?.options;
	const submitAnswers = JSON.parse(solveResult?.submittedAnswer ?? "null") as {
		submitAnswers: number[];
	} | null;

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{(
				submitAnswers?.submitAnswers ??
				Array.from({ length: options?.length ?? 0 }, (_, index) => index + 1)
			).map((answer) => {
				const option = options?.find((option) => option.answerOrder === answer);

				if (!option) {
					return null;
				}

				return (
					<SolvingAnswerOrdering
						key={answer}
						variation={solveResult?.isCorrect ? "correct" : "incorrect"}
						option={option}
					/>
				);
			})}
		</div>
	);
};

export default DashboardQuestionOrderingAnswers;
