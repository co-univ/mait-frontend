import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import QuestionContent from "@/components/QuestionContent";
import { useConfirm } from "@/components/confirm";
import { apiClient, apiHooks } from "@/libs/api";
import type { QuestionType } from "@/libs/types";
import ErrorDetect from "@/pages/ErrorDetect";
import Loading from "@/pages/Loading";
import { notify } from "@/components/Toast";
import questionAnswerString from "@/utils/question-answer-string";
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
import SolvingReviewExplanation from "../review/SolvingReviewExplanation";
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
		interactedOrderingQuestionIds,
		getUserAnswers,
		setAnswerInitInfo,
		replaceUserAnswers,
		markOrderingInteracted,
		setGradeResults,
		reset,
	} = useSolvingStudyAnswerStore();
	const { mutateAsync: gradeStudyAsync, isPending: isGrading } =
		apiHooks.useMutation(
			"post",
			"/api/v1/question-sets/{questionSetId}/study-mode/grade",
		);

	const answeredQuestionIds = questions
		.filter((studyQuestion) => {
			if (result[studyQuestion.id]?.type === "ORDERING") {
				return interactedOrderingQuestionIds.has(studyQuestion.id);
			}
			return solvingIsStudyQuestionAnswered(
				result[studyQuestion.id]?.userAnswers ?? [],
				result[studyQuestion.id]?.type,
			);
		})
		.map((studyQuestion) => studyQuestion.id);
	const unansweredQuestionCount = questions.length - answeredQuestionIds.length;
	const firstQuestionId =
		questions.find((studyQuestion) => studyQuestion.number === 1)?.id ??
		questions[0]?.id;
	const isCurrentQuestionCorrect = result[questionId]?.isCorrect ?? null;
	const isCorrectMap = questions.reduce<Record<number, boolean | null>>(
		(acc, studyQuestion) => {
			acc[studyQuestion.id] = result[studyQuestion.id]?.isCorrect ?? null;
			return acc;
		},
		{},
	);

	/**
	 *
	 */
	const persistCurrentDraft = async () => {
		if (!type || isGraded) {
			return true;
		}

		const userAnswers = getUserAnswers(questionId);
		const hasAnswers = hasStudyAnswers(userAnswers, type as QuestionType);

		if (!hasAnswers) {
			const hasDraftOnServer = drafts.some(
				(draft) => draft.questionId === questionId && !!draft.submittedAnswer,
			);
			if (hasDraftOnServer) {
				sessionStorage.setItem(
					`study_draft_cleared_${questionSetId}_${questionId}`,
					"true",
				);
			}
			return true;
		}

		sessionStorage.removeItem(`study_draft_cleared_${questionSetId}_${questionId}`);

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

			queryClient.invalidateQueries({
				predicate: (query) =>
					Array.isArray(query.queryKey) &&
					query.queryKey.some(
						(key) =>
							typeof key === "string" &&
							key.includes("study-mode/drafts"),
					),
			});

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
						title: "이대로 제출하시겠습니까?",
						description: "아직 풀지 않은 문제가 있어요. 그래도 제출하시겠어요?",
						confirmText: "확인",
						cancelText: "취소",
					}
				: {
						title: "이대로 제출하시겠습니까?",
						description:
							"문제를 모두 풀었어요. 제출하면 전체 채점이 완료되며, 이후에는 다시 풀 수 없어요.",
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
						isCorrect={isCurrentQuestionCorrect}
					/>
				);
			case "SHORT":
				return (
					<SolvingStudyShortAnswers
						questionSetId={questionSetId}
						questionId={questionId}
						readOnly={isGraded}
						isCorrect={isCurrentQuestionCorrect}
					/>
				);
			case "ORDERING":
				return (
					<SolvingStudyOrderingAnswers
						questionSetId={questionSetId}
						questionId={questionId}
						readOnly={isGraded}
						isCorrect={isCurrentQuestionCorrect}
					/>
				);
			case "FILL_BLANK":
				return (
					<SolvingStudyFillBlankAnswers
						questionSetId={questionSetId}
						questionId={questionId}
						readOnly={isGraded}
						isCorrect={isCurrentQuestionCorrect}
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

			const isCleared =
				sessionStorage.getItem(
					`study_draft_cleared_${questionSetId}_${draft.questionId}`,
				) === "true";

			if (isCleared) {
				return;
			}

			const parsed = solvingParseStudyDraftData(draft.submittedAnswer);
			replaceUserAnswers(draft.questionId, parsed);

			const isOrdering = questions.some(
				(q) =>
					q.id === draft.questionId &&
					(q.type as QuestionType | undefined) === "ORDERING",
			);
			if (isOrdering) {
				markOrderingInteracted(draft.questionId);
			}
		});
	}, [drafts, questions, replaceUserAnswers, markOrderingInteracted, questionSetId]);

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
				isGraded={isGraded}
				isCorrectMap={isCorrectMap}
				isSubmitting={isGrading}
				onQuestionNavigate={handleQuestionNavigate}
				onSubmit={handleAnswersSubmit}
			/>
			<QuestionContent content={content} />
			{renderQuestionAnswers()}
			{isGraded && (
					<SolvingReviewExplanation
						isExplanationShown
						isCorrect={isCurrentQuestionCorrect}
						answer={questionAnswerString(question as QuestionResponseType)}
						explanation={question.explanation}
					/>
			)}
			<SolvingQuizImage src={imageUrl} />
		</SolvingLayout>
	);
};

export default SolvingStudy;
