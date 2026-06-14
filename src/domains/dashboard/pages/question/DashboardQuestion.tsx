import { useParams } from "react-router-dom";
import LoadingView from "@/components/LoadingView";
import QuestionContent from "@/components/QuestionContent";
import SolvingQuizImage from "@/domains/solving/components/common/SolvingQuizImage";
import type { QuestionType } from "@/libs/types";
import DashboardQuestionBadge from "../../components/question/DashboardQuestionBadge";
import DashboardQuestionNavigation from "../../components/question/DashboardQuestionNavigation";
import DashboardQuestionScore from "../../components/question/DashboardQuestionScore";
import useDashboardQuestionLoading from "../../hooks/question/useDashboardQuestionLoading";
import useDashboardQuestionResults from "../../hooks/question/useDashboardQuestionResults";
import useDashboardQuestions from "../../hooks/question/useDashboardQuestions";
import DashboardQuestionFillBlankAnswers from "./DashboardQuestionFillBlankAnswers";
import DashboardQuestionInformation from "./DashboardQuestionInformation";
import DashboardQuestionMultipleAnswers from "./DashboardQuestionMultipleAnswers";
import DashboardQuestionOrderingAnswers from "./DashboardQuestionOrderingAnswers";
import DashboardQuestionShortAnswers from "./DashboardQuestionShortAnswers";

//
//
//

const DashboardQuestion = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { isLoading } = useDashboardQuestionLoading({ questionSetId });

	const { questions, targetQuestion: question } = useDashboardQuestions({
		questionSetId,
		questionId,
	});

	const { solveResults, targetSolveResult, totalCount, correctCount, score } =
		useDashboardQuestionResults({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const renderQuestionAnswers = () => {
		const type = question?.type as QuestionType;

		switch (type) {
			case "MULTIPLE":
				return <DashboardQuestionMultipleAnswers />;
			case "SHORT":
				return <DashboardQuestionShortAnswers />;
			case "FILL_BLANK":
				return <DashboardQuestionFillBlankAnswers />;
			case "ORDERING":
				return <DashboardQuestionOrderingAnswers />;
			default:
				return null;
		}
	};

	if (isLoading) {
		return <LoadingView />;
	}

	return (
		<div className="w-full h-full flex flex-col gap-gap-14 py-padding-12">
			<DashboardQuestionInformation />

			<div className="w-full h-full flex flex-col gap-gap-11">
				<DashboardQuestionScore
					totalCount={totalCount}
					correctCount={correctCount}
					score={score}
				/>
				<DashboardQuestionNavigation
					questions={questions}
					solveResults={solveResults}
				/>
				<DashboardQuestionBadge
					solveResult={targetSolveResult}
					number={question?.number}
				/>
				<QuestionContent content={question?.content ?? ""} />
				<SolvingQuizImage src={question?.imageUrl} />
				<div className="h-full flex flex-col justify-end">
					{renderQuestionAnswers()}
				</div>
			</div>
		</div>
	);
};

export default DashboardQuestion;
