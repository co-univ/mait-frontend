import { useParams } from "react-router-dom";
import SolvingAnswerShort from "@/domains/solving/components/common/answer/SolvingAnswerShort";
import type { ShortQuestionApiResponse } from "@/libs/types";
import useDashboardQuestionResults from "../../hooks/question/useDashboardQuestionResults";
import useDashboardQuestions from "../../hooks/question/useDashboardQuestions";

//
//
//

const DashboardQuestionShortAnswers = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { targetQuestion: question } =
		useDashboardQuestions<ShortQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { targetSolveResult: solveResult } = useDashboardQuestionResults({
		questionSetId,
		questionId,
	});

	const answers = question?.answers?.map((answer) => answer.answer) ?? [];
	const submitAnswers = JSON.parse(solveResult?.submittedAnswer ?? "null") as {
		submitAnswers: string[];
	} | null;

	/**
	 *
	 */
	const getVariation = (submitAnswer: string) => {
		if (answers.includes(submitAnswer)) {
			return "correct";
		}

		return "incorrect";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{(
				submitAnswers?.submitAnswers ??
				Array(question?.answerCount ?? 0).fill("")
			).map((answer, index) => (
				<SolvingAnswerShort
					// biome-ignore lint/suspicious/noArrayIndexKey: order of short answers is fixed
					key={index}
					readOnly
					variation={getVariation(answer)}
					answer={answer}
				/>
			))}
		</div>
	);
};

export default DashboardQuestionShortAnswers;
