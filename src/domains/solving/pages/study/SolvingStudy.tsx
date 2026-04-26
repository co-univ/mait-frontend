import { useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionContent from "@/components/QuestionContent";
import { apiHooks } from "@/libs/api";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";
import SolvingQuizImage from "../../components/common/SolvingQuizImage";
import useSolvingQuestion from "../../hooks/common/useSolvingQuestion";
import useSolvingStudyQuestions from "../../hooks/study/useSolvingStudyQuestions";
import SolvingLayout from "../../layouts/common/SolvingLayout";
import useSolvingStudyAnswerStore from "../../stores/study/useSolvingStudyAnswerStore";
import SolvingStudyFillBlankAnswers from "./answers/SolvingStudyFillBlankAnswers";
import SolvingStudyMultipleAnswers from "./answers/SolvingStudyMultipleAnswers";
import SolvingStudyOrderingAnswers from "./answers/SolvingStudyOrderingAnswers";
import SolvingStudyShortAnswers from "./answers/SolvingStudyShortAnswers";
import SolvingStudyHeader from "./SolvingStudyHeader";
import type { QuestionType } from "@/libs/types";

//
//
//

const SolvingStudy = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions, isLoading: isQuestionsLoading } = useSolvingStudyQuestions({
		questionSetId,
	});
	const { question, content, number, imageUrl, type, isLoading } =
		useSolvingQuestion({
			questionSetId,
			questionId,
			mode: "STUDY",
		});
	const { setAnswerInitInfo, reset } = useSolvingStudyAnswerStore();

	const { mutate: updateLastViewedQuestion } = apiHooks.useMutation(
		"put",
		"/api/v1/question-sets/{questionSetId}/questions/last-viewed",
	);

	/**
	 *
	 */
	const renderQuestionAnswers = () => {
		if (!type) {
			return null;
		}

		switch (type) {
			case "MULTIPLE":
				return (
					<SolvingStudyMultipleAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "SHORT":
				return (
					<SolvingStudyShortAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "ORDERING":
				return (
					<SolvingStudyOrderingAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "FILL_BLANK":
				return (
					<SolvingStudyFillBlankAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		if (!question || !type) {
			return;
		}

		setAnswerInitInfo(questionId, type as QuestionType);
		updateLastViewedQuestion({
			params: {
				path: {
					questionSetId,
				},
			},
			body: {
				questionId,
			},
		});
	}, [
		question,
		type,
		questionId,
		questionSetId,
		setAnswerInitInfo,
		updateLastViewedQuestion,
	]);

	useEffect(() => {
		return () => reset();
	}, [reset]);

	if (isLoading || isQuestionsLoading) {
		return <Loading />;
	}

	if (!question) {
		return <ErrorDetect />;
	}

	return (
		<SolvingLayout>
			<SolvingStudyHeader
				questionSetId={questionSetId}
				questionId={questionId}
				number={number}
				questions={questions}
			/>
			<QuestionContent content={content} />
			{renderQuestionAnswers()}
			<SolvingQuizImage imgUrl={imageUrl} />
		</SolvingLayout>
	);
};

export default SolvingStudy;
