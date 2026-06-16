import { useParams } from "react-router-dom";
import SolvingAnswerFillBlank from "@/domains/solving/components/common/answer/SolvingAnswerFillBlank";
import type { FillBlankQuestionApiResponse } from "@/libs/types";
import useDashboardQuestionResults from "../../hooks/question/useDashboardQuestionResults";
import useDashboardQuestions from "../../hooks/question/useDashboardQuestions";

//
//
//

const DashboardQuestionFillBlankAnswers = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { targetQuestion: question } =
		useDashboardQuestions<FillBlankQuestionApiResponse>({
			questionSetId,
			questionId,
		});

	const { targetSolveResult: solveResult } = useDashboardQuestionResults({
		questionSetId,
		questionId,
	});

	const answers = question?.answers;
	const submitAnswers = JSON.parse(solveResult?.submittedAnswer ?? "null") as {
		submitAnswers: {
			answer: string;
			number: number;
		}[];
	} | null;

	/**
	 *
	 */
	const getVariation = (submitAnswer: string, number: number) => {
		if (
			answers?.find(
				(answer) => answer.number === number && answer.answer === submitAnswer,
			)
		) {
			return "correct";
		}

		return "incorrect";
	};

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{(
				submitAnswers?.submitAnswers ??
				Array.from({ length: question?.blankCount ?? 0 }, (_, index) => ({
					answer: "",
					number: index + 1,
				}))
			).map((answer, index) => (
				<SolvingAnswerFillBlank
					// biome-ignore lint/suspicious/noArrayIndexKey: order of short answers is fixed
					key={index}
					readOnly
					variation={getVariation(answer.answer, answer.number)}
					answer={answer}
					onAnswerChange={() => {}}
				/>
			))}
		</div>
	);
};

export default DashboardQuestionFillBlankAnswers;
