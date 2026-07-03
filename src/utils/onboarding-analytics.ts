import {
	ONBOARDING_ANALYTICS_EVENT_PREFIX,
	type OnboardingCode,
} from "@/components/onboarding/onboarding.config";
import { apiClient } from "@/libs/api";

//
//
//

const FEATURE_KEY = "onboarding";

//
//
//

const postAnalyticsEvent = (
	eventName: string,
	sessionId: string,
	step?: number,
) => {
	apiClient
		.POST("/api/v1/analytics/events", {
			body: {
				featureKey: FEATURE_KEY,
				eventName,
				sessionId,
				...(step !== undefined ? { step } : {}),
			},
		})
		.catch(() => {
			// 애널리틱스 전송 실패는 온보딩 흐름에 영향을 주지 않음
		});
};

export const sendOnboardingViewEvent = (
	code: OnboardingCode,
	sessionId: string,
) => {
	const prefix = ONBOARDING_ANALYTICS_EVENT_PREFIX[code];
	if (!prefix) return;
	postAnalyticsEvent(`${prefix}_view`, sessionId);
};

export const sendOnboardingExitEvent = (
	code: OnboardingCode,
	sessionId: string,
	step: number,
) => {
	const prefix = ONBOARDING_ANALYTICS_EVENT_PREFIX[code];
	if (!prefix) return;
	postAnalyticsEvent(`${prefix}_exit`, sessionId, step);
};
