import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import QuestionContent from "@/components/QuestionContent";
import { apiHooks } from "@/libs/api";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import SolvingQuizImage from "../../components/common/SolvingQuizImage";
import SolvingSubmitResult from "../../components/common/SolvingSubmitResult";
import useSolvingQuestion from "../../hooks/common/useSolvingQuestion";
import useSolvingReviewAnswerSubmit from "../../hooks/review/useSolvingReviewAnswerSubmit";
import useSolvingReviewExplanation from "../../hooks/review/useSolvingReviewExplanation";
import useSolvingReviewQuestions from "../../hooks/review/useSolvingReviewQuestions";
import SolvingLayout from "../../layouts/common/SolvingLayout";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";
import SolvingReviewFillBlankAnswers from "./answers/SolvingReviewFillBlankAnswers";
import SolvingReviewMultipleAnswers from "./answers/SolvingReviewMultipleAnswers";
import SolvingReviewOrderingAnswers from "./answers/SolvingReviewOrderingAnswers";
import SolvingReviewShortAnswers from "./answers/SolvingReviewShortAnswers";
import SolvingReviewExplanation from "./SolvingReviewExplanation";
import SolvingReviewHeader from "./SolvingReviewHeader";

//
//
//

const SolvingReview = () => {
	const [isSolvingResultShown, setIsSolvingResultShown] = useState<
		Record<number, boolean>
	>({});

	const location = useLocation();
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);
	const entrySource =
		(location.state as { entrySource?: string } | null)?.entrySource ??
		"direct";
	const sessionStartedAtRef = useRef<number | null>(null);
	const hasTrackedEnterRef = useRef(false);
	const hasTrackedExitRef = useRef(false);
	const currentQuestionSetIdRef = useRef<number>(questionSetId);
	const currentQuestionIdRef = useRef<number | null>(questionId);
	const currentEntrySourceRef = useRef(entrySource);
	const trackedQuestionViewKeysRef = useRef<Set<string>>(new Set());
	const trackedExplanationViewKeysRef = useRef<Set<string>>(new Set());

	const queryClient = useQueryClient();

	// 문제 목록
	const { questions } = useSolvingReviewQuestions({ questionSetId });

	// 문제 데이터
	const { question, content, number, imageUrl, type, isLoading } =
		useSolvingQuestion({
			questionSetId,
			questionId,
			mode: "REVIEW",
		});

	// Store
	const { getIsSubmitted, getIsCorrect, setAnswerInitInfo, reset } =
		useSolvingReviewAnswerResultStore();

	const isSubmitted = getIsSubmitted(questionId);
	const isCorrect = getIsCorrect(questionId);

	// 제출
	const { submitAnswer, isSubmitting } = useSolvingReviewAnswerSubmit();

	// 해설
	const {
		isExplanationShown,
		answer,
		explanation,
		showExplanation,
		hideExplanation,
	} = useSolvingReviewExplanation({
		questionSetId,
		questionId,
		question,
	});

	// 마지막 조회 문제 업데이트
	const { mutate: updateLastViewedQuestion } = apiHooks.useMutation(
		"put",
		"/api/v1/question-sets/{questionSetId}/questions/last-viewed",
		{
			onSuccess: () => {
				queryClient.removeQueries({
					queryKey: apiHooks.queryOptions(
						"get",
						"/api/v1/question-sets/{questionSetId}/questions/last-viewed",
						{
							params: {
								path: {
									questionSetId,
								},
							},
						},
					).queryKey,
				});
			},
		},
	);

	/**
	 *
	 */
	const handleAnswersSubmit = async () => {
		if (isSubmitting || !type) {
			return;
		}

		await submitAnswer({
			questionSetId,
			questionId,
			questionType: type,
		});
	};

	/**
	 *
	 */
	const handleSolvingResultAnimationComplete = () => {
		const timer = setTimeout(() => {
			setIsSolvingResultShown((prev) => ({
				...prev,
				[questionId]: true,
			}));
		}, 2000);

		return () => clearTimeout(timer);
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
					<SolvingReviewMultipleAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "SHORT":
				return (
					<SolvingReviewShortAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "ORDERING":
				return (
					<SolvingReviewOrderingAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "FILL_BLANK":
				return (
					<SolvingReviewFillBlankAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			default:
				return null;
		}
	};

	// Store 초기화 및 마지막 조회 업데이트
	useEffect(() => {
		if (!question || !type) {
			return;
		}

		setAnswerInitInfo(questionId, type);
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
		questionSetId,
		questionId,
		question,
		type,
		setAnswerInitInfo,
		updateLastViewedQuestion,
	]);

	useEffect(() => {
		currentQuestionSetIdRef.current = questionSetId;
		currentQuestionIdRef.current = questionId;
		currentEntrySourceRef.current = entrySource;
	}, [entrySource, questionId, questionSetId]);

	useEffect(() => {
		if (Number.isNaN(questionSetId)) {
			return;
		}

		sessionStartedAtRef.current = Date.now();
		hasTrackedEnterRef.current = false;
		hasTrackedExitRef.current = false;
		trackedQuestionViewKeysRef.current.clear();
		trackedExplanationViewKeysRef.current.clear();
	}, [questionSetId]);

	useEffect(() => {
		if (isLoading || !question || hasTrackedEnterRef.current) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingReviewEnter, {
			question_set_id: questionSetId.toString(),
			question_id: questionId.toString(),
			entry_source: entrySource,
			mode: "review",
		});
		hasTrackedEnterRef.current = true;
	}, [entrySource, isLoading, question, questionId, questionSetId]);

	useEffect(() => {
		if (isLoading || !question) {
			return;
		}

		const questionViewKey = `${questionSetId}:${questionId}`;

		if (trackedQuestionViewKeysRef.current.has(questionViewKey)) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingReviewQuestionView, {
			question_set_id: questionSetId.toString(),
			question_id: questionId.toString(),
			entry_source: entrySource,
			mode: "review",
		});
		trackedQuestionViewKeysRef.current.add(questionViewKey);
	}, [entrySource, isLoading, question, questionId, questionSetId]);

	useEffect(() => {
		if (!isExplanationShown || !question) {
			return;
		}

		const explanationViewKey = `${questionSetId}:${questionId}`;

		if (trackedExplanationViewKeysRef.current.has(explanationViewKey)) {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingReviewExplanationView, {
			question_set_id: questionSetId.toString(),
			question_id: questionId.toString(),
			entry_source: entrySource,
			mode: "review",
		});
		trackedExplanationViewKeysRef.current.add(explanationViewKey);
	}, [entrySource, isExplanationShown, question, questionId, questionSetId]);

	useEffect(() => {
		const handlePageHide = () => {
			if (hasTrackedExitRef.current || sessionStartedAtRef.current === null) {
				return;
			}

			const reviewDurationSeconds = Math.max(
				1,
				Math.round((Date.now() - sessionStartedAtRef.current) / 1000),
			);

			trackEvent(GTM_EVENT_NAMES.solvingReviewExit, {
				question_set_id: currentQuestionSetIdRef.current.toString(),
				question_id: currentQuestionIdRef.current?.toString(),
				entry_source: currentEntrySourceRef.current,
				mode: "review",
				review_duration_seconds: reviewDurationSeconds,
			});
			hasTrackedExitRef.current = true;
		};

		window.addEventListener("pagehide", handlePageHide);

		return () => {
			window.removeEventListener("pagehide", handlePageHide);

			handlePageHide();
		};
	}, []);

	// 컴포넌트 언마운트 시 Store 리셋
	useEffect(() => {
		return () => reset();
	}, [reset]);

	if (isLoading) {
		return null;
	}

	return (
		<SolvingLayout>
			<SolvingReviewHeader
				isSubmitted={isSubmitted}
				isCorrect={isCorrect}
				isExplanationShown={isExplanationShown}
				questionSetId={questionSetId}
				questionId={questionId}
				number={number}
				questions={questions}
				handleAnswersSubmit={handleAnswersSubmit}
				showExplanation={showExplanation}
				hideExplanation={hideExplanation}
			/>

			<QuestionContent content={content} />

			<SolvingQuizImage src={imageUrl} />

			<div className="h-full flex flex-col justify-end">
				{renderQuestionAnswers()}
			</div>

			<SolvingReviewExplanation
				isExplanationShown={isExplanationShown}
				isCorrect={isCorrect}
				answer={answer ?? ""}
				explanation={explanation}
			/>

			<SolvingSubmitResult
				correct={!!isCorrect}
				show={isSubmitted && !isSolvingResultShown[questionId]}
				onAnimationComplete={handleSolvingResultAnimationComplete}
			/>
		</SolvingLayout>
	);
};

export default SolvingReview;
