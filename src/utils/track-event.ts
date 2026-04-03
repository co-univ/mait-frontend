export const GTM_EVENT_NAMES = {
	solvingLiveTabView: "solving_live_tab_view",
	solvingLiveCtaClick: "solving_live_cta_click",
	solvingLiveEnter: "solving_live_enter",
	solvingLiveFirstQuestionView: "solving_live_first_question_view",
	solvingLiveResultCtaView: "solving_live_result_cta_view",
	solvingLiveResultCtaClick: "solving_live_result_cta_click",
	solvingLiveStageView: "solving_live_stage_view",
	solvingLiveExit: "solving_live_exit",
	solvingLiveAnswerSubmit: "solving_live_answer_submit",
	solvingReviewCtaClick: "solving_review_cta_click",
	solvingReviewEnter: "solving_review_enter",
	solvingReviewQuestionView: "solving_review_question_view",
	solvingReviewExplanationView: "solving_review_explanation_view",
	solvingReviewExit: "solving_review_exit",
} as const;

type TrackEventParams = Record<
	string,
	boolean | number | string | null | undefined
>;

export const trackEvent = (event: string, params: TrackEventParams = {}) => {
	if (typeof window === "undefined") {
		return;
	}

	const cleanedParams = Object.fromEntries(
		Object.entries(params).filter(([, value]) => value !== undefined),
	);

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event,
		...cleanedParams,
	});
};
