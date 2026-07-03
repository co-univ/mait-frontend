import { useCallback } from "react";
import {
	ONBOARDING_STEPS_BY_CODE,
	type OnboardingCode,
} from "@/components/onboarding/onboarding.config";
import useOnboardingStore from "@/stores/useOnboardingStore";
import {
	sendOnboardingExitEvent,
	sendOnboardingViewEvent,
} from "@/utils/onboarding-analytics";

//
//
//

const useOnboardingAnalytics = () => {
	const setAnalyticsSessionId = useOnboardingStore(
		(s) => s.setAnalyticsSessionId,
	);

	// 새 온보딩 세션 시작: sessionId 생성 + 저장 + view 이벤트 전송
	const startSession = useCallback(
		(code: OnboardingCode) => {
			const sessionId = crypto.randomUUID();
			setAnalyticsSessionId(sessionId);
			sendOnboardingViewEvent(code, sessionId);
			return sessionId;
		},
		[setAnalyticsSessionId],
	);

	// 현재 스토어 상태 기준으로 exit 이벤트 전송. step은 1-based.
	// finishOnboarding에서 이미 전송한 경우(isFinishModalOpen) 중복 스킵.
	const endSession = useCallback((step: number) => {
		const {
			analyticsSessionId: sessionId,
			pendingCodes: codes,
			currentCodeIndex: idx,
			isFinishModalOpen: modalOpen,
		} = useOnboardingStore.getState();
		const code = codes[idx];

		if (sessionId && code && !modalOpen) {
			sendOnboardingExitEvent(code, sessionId, step);
		}
	}, []);

	// 온보딩 완료(끝까지 진행) 시 exit 이벤트 전송. step = 총 스텝 수.
	const endSessionOnFinish = useCallback(() => {
		const {
			analyticsSessionId: sessionId,
			pendingCodes: codes,
			currentCodeIndex: idx,
		} = useOnboardingStore.getState();
		const code = codes[idx];

		if (sessionId && code) {
			sendOnboardingExitEvent(
				code,
				sessionId,
				ONBOARDING_STEPS_BY_CODE[code].length,
			);
		}
	}, []);

	return { startSession, endSession, endSessionOnFinish };
};

export default useOnboardingAnalytics;
