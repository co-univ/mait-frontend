import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionContent from "@/components/QuestionContent";
import { useConfirm } from "@/components/confirm";
import { apiClient, apiHooks } from "@/libs/api";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";
import { notify } from "@/components/Toast";
import { createPath } from "@/utils/create-path";
import SolvingQuizImage from "../../components/common/SolvingQuizImage";
import useSolvingQuestion from "../../hooks/common/useSolvingQuestion";
import useSolvingStudyDrafts from "../../hooks/study/useSolvingStudyDrafts";
import useSolvingStudyQuestions from "../../hooks/study/useSolvingStudyQuestions";
import SolvingLayout from "../../layouts/common/SolvingLayout";
import useSolvingStudyAnswerStore from "../../stores/study/useSolvingStudyAnswerStore";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";
import SolvingStudyFillBlankAnswers from "./answers/SolvingStudyFillBlankAnswers";
import SolvingStudyMultipleAnswers from "./answers/SolvingStudyMultipleAnswers";
import SolvingStudyOrderingAnswers from "./answers/SolvingStudyOrderingAnswers";
import SolvingStudyShortAnswers from "./answers/SolvingStudyShortAnswers";
import SolvingStudyHeader from "./SolvingStudyHeader";
import type { QuestionType } from "@/libs/types";
import {
	hasStudyAnswers,
	solvingBuildStudyDraftData,
} from "../../utils/solvingBuildStudyDraftData";
import { solvingIsStudyQuestionAnswered } from "../../utils/solvingIsStudyQuestionAnswered";
import { solvingParseStudyDraftData } from "../../utils/solvingParseStudyDraftData";

//
//
//

const SolvingStudy = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { confirm } = useConfirm();
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions, isLoading: isQuestionsLoading } = useSolvingStudyQuestions({
		questionSetId,
	});
	const { drafts, isLoading: isDraftsLoading } = useSolvingStudyDrafts({
		questionSetId,
	});
	const { question, content, number, imageUrl, type, isLoading } =
		useSolvingQuestion({
			questionSetId,
			questionId,
			mode: "STUDY",
		});
	const {
		isGraded,
		result,
		getUserAnswers,
		setAnswerInitInfo,
		replaceUserAnswers,
		setGradeResults,
		reset,
	} = useSolvingStudyAnswerStore();
	const { mutateAsync: gradeStudyAsync, isPending: isGrading } =
		apiHooks.useMutation(
			"post",
			"/api/v1/question-sets/{questionSetId}/study-mode/grade",
		);

	const answeredQuestionIds = questions
		.filter((studyQuestion) =>
			solvingIsStudyQuestionAnswered(
				result[studyQuestion.id]?.userAnswers ?? [],
				result[studyQuestion.id]?.type,
			),
		)
		.map((studyQuestion) => studyQuestion.id);
	const unansweredQuestionCount = questions.length - answeredQuestionIds.length;
	const firstQuestionId =
		questions.find((studyQuestion) => studyQuestion.number === 1)?.id ??
		questions[0]?.id;

	/**
	 *
	 */
	const persistCurrentDraft = async () => {
		if (!type || isGraded) {
			return true;
		}

		const userAnswers = getUserAnswers(questionId);

		if (!hasStudyAnswers(userAnswers, type as QuestionType)) {
			return true;
		}

		try {
			const body = solvingBuildStudyDraftData(
				userAnswers,
				type as QuestionType,
			);

			await apiClient.PATCH(
				"/api/v1/question-sets/{questionSetId}/study-mode/drafts/{questionId}",
				{
					params: {
						path: {
							questionSetId,
							questionId,
						},
					},
					// biome-ignore lint/suspicious/noExplicitAny: openapi union body requires runtime discriminator shape
					body: body as any,
				},
			);

			return true;
		} catch {
			notify.error("답안 저장에 실패했습니다.");
			return false;
		}
	};

	/**
	 *
	 */
	const handleQuestionNavigate = async (targetQuestionId: number) => {
		if (targetQuestionId === questionId) {
			return;
		}

		await persistCurrentDraft();
	};

	/**
	 *
	 */
	const handleAnswersSubmit = async () => {
		if (isGrading) {
			return;
		}

		const isConfirmed = await confirm(
			unansweredQuestionCount > 0
				? {
						title: "풀지 않은 문제가 있습니다. 그래도 제출하시겠습니까?",
						confirmText: "확인",
						cancelText: "취소",
					}
				: {
						title: "제출하시겠습니까?",
						description:
							"문제셋 전체가 채점됩니다. 원하시는 상태로 복구가 어렵습니다.",
						confirmText: "확인",
						cancelText: "취소",
					},
		);

		if (!isConfirmed) {
			return;
		}

		try {
			const isDraftSaved = await persistCurrentDraft();

			if (!isDraftSaved) {
				return;
			}

			const response = await gradeStudyAsync({
				params: {
					path: {
						questionSetId,
					},
				},
			});

			setGradeResults(response.data?.results ?? []);
			queryClient.invalidateQueries({
				predicate: (query) =>
					Array.isArray(query.queryKey) &&
					query.queryKey.some(
						(key) =>
							typeof key === "string" &&
							key.includes("/api/v1/question-sets/study/progress"),
					),
			});

			if (firstQuestionId) {
				navigate(
					createPath(SOLVING_ROUTE_PATH.STUDY, {
						questionSetId,
						questionId: firstQuestionId,
					}),
					{
						replace: true,
					},
				);
			}
		} catch {
			notify.error("채점에 실패했습니다.");
		}
	};

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
						readOnly={isGraded}
					/>
				);
			case "SHORT":
				return (
					<SolvingStudyShortAnswers
						questionSetId={questionSetId}
						questionId={questionId}
						readOnly={isGraded}
					/>
				);
			case "ORDERING":
				return (
					<SolvingStudyOrderingAnswers
						questionSetId={questionSetId}
						questionId={questionId}
						readOnly={isGraded}
					/>
				);
			case "FILL_BLANK":
				return (
					<SolvingStudyFillBlankAnswers
						questionSetId={questionSetId}
						questionId={questionId}
						readOnly={isGraded}
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
	}, [question, type, questionId, setAnswerInitInfo]);

	useEffect(() => {
		questions.forEach((studyQuestion) => {
			if (studyQuestion.type) {
				setAnswerInitInfo(studyQuestion.id, studyQuestion.type as QuestionType);
			}
		});
	}, [questions, setAnswerInitInfo]);

	useEffect(() => {
		if (drafts.length === 0) {
			return;
		}

		drafts.forEach((draft) => {
			if (!draft.submittedAnswer) {
				return;
			}

			replaceUserAnswers(
				draft.questionId,
				solvingParseStudyDraftData(draft.submittedAnswer),
			);
		});
	}, [drafts, replaceUserAnswers]);

	useEffect(() => {
		return () => reset();
	}, [reset]);

	if (isLoading || isQuestionsLoading || isDraftsLoading) {
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
				answeredQuestionIds={answeredQuestionIds}
				isSubmitting={isGrading}
				onQuestionNavigate={handleQuestionNavigate}
				onSubmit={handleAnswersSubmit}
			/>
			<QuestionContent content={content} />
			{renderQuestionAnswers()}
			<SolvingQuizImage src={imageUrl} />
		</SolvingLayout>
	);
};

export default SolvingStudy;
