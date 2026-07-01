import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	ONBOARDING_STEPS_BY_CODE,
	type OnboardingCode,
} from "@/components/onboarding/onboarding.config";
import { HOME_ROUTE_PATH } from "@/domains/home/home.routes";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import { SOLVING_ROUTE_PATH } from "@/domains/solving/solving.routes";
import { apiClient, apiHooks } from "@/libs/api";
import useOnboardingStore from "@/stores/useOnboardingStore";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import useUser from "./useUser";

const getSessionKey = (code: OnboardingCode) =>
	`onboarding-completed-session-${code}`;

const ONBOARDING_CODE_PATH_PREFIX: Record<OnboardingCode, string> = {
	HOME_GUIDE: HOME_ROUTE_PATH.ROOT,
	QUESTION_SOLVE_SET_LIST: SOLVING_ROUTE_PATH.QUESTION_SETS,
	QUESTION_MANAGE_SET_LIST: MANAGEMENT_ROUTE_PATH.ROOT,
	QUESTION_MANAGE_DETAIL: "/control/live/solving/",
	QUESTION_MANAGE_NEXT_ROUND: "/control/live/participant/",
};

//
//
//

const useOnboarding = () => {
	const queryClient = useQueryClient();
	const { user } = useUser();
	const location = useLocation();

	const {
		pendingCodes,
		currentCodeIndex,
		currentStepIndex,
		isActive,
		isFinishModalOpen,
		setPendingCodes,
		setPendingScreenIds,
		setCurrentCodeIndex,
		setCurrentStepIndex,
		setIsActive,
		setIsFinishModalOpen,
		reset,
	} = useOnboardingStore();

	const { isSidebarOpen, toggleSidebarOpen } = useSidebarOpenStore();

	const { data: unviewedScreensData, isSuccess: isUnviewedLoaded } =
		apiHooks.useQuery(
			"get",
			"/api/v1/onboarding/screens/unviewed",
			{},
			{ staleTime: Infinity, enabled: !!user },
		);

	// If persisted state contains an unknown code (e.g. old enum values), reset it
	useEffect(() => {
		if (
			pendingCodes.length > 0 &&
			pendingCodes.some((c) => !ONBOARDING_STEPS_BY_CODE[c])
		) {
			reset();
		}
	}, [pendingCodes, reset]);

	//
	//
	//

	const currentCode =
		pendingCodes[currentCodeIndex] &&
		ONBOARDING_STEPS_BY_CODE[pendingCodes[currentCodeIndex]]
			? pendingCodes[currentCodeIndex]
			: null;
	const currentStepKey = currentCode
		? (ONBOARDING_STEPS_BY_CODE[currentCode][currentStepIndex] ?? null)
		: null;

	const canStartCode = (code: OnboardingCode): boolean => {
		if (isActive || isFinishModalOpen) return false;
		if (sessionStorage.getItem(getSessionKey(code)) === "true") return false;
		const unviewedScreens = unviewedScreensData?.data ?? [];
		return unviewedScreens.some((s) => s.code === code);
	};

	const totalSteps = pendingCodes.reduce(
		(sum, code) => sum + ONBOARDING_STEPS_BY_CODE[code].length,
		0,
	);

	const getFlatIndex = (codeIdx: number, stepIdx: number): number => {
		let flat = 0;
		for (let i = 0; i < codeIdx; i++) {
			flat += ONBOARDING_STEPS_BY_CODE[pendingCodes[i]].length;
		}
		return flat + stepIdx;
	};

	const fromFlatIndex = (
		flat: number,
	): { codeIndex: number; stepIndex: number } => {
		let remaining = flat;
		for (let i = 0; i < pendingCodes.length; i++) {
			const len = ONBOARDING_STEPS_BY_CODE[pendingCodes[i]].length;
			if (remaining < len) return { codeIndex: i, stepIndex: remaining };
			remaining -= len;
		}
		return { codeIndex: pendingCodes.length - 1, stepIndex: 0 };
	};

	const currentFlatIndex = getFlatIndex(currentCodeIndex, currentStepIndex);

	//
	//
	//

	const startOnboardingForCode = (
		code: OnboardingCode,
		{ force = false }: { force?: boolean } = {},
	) => {
		if (!force && !canStartCode(code)) {
			return;
		}

		// When forced, still check session and unviewed (skip only the isActive guard)
		if (force) {
			if (sessionStorage.getItem(getSessionKey(code)) === "true") return;
			const unviewedScreens = unviewedScreensData?.data ?? [];
			if (!unviewedScreens.some((s) => s.code === code)) return;
		}

		const unviewedScreens = unviewedScreensData?.data ?? [];
		const screen = unviewedScreens.find((s) => s.code === code);
		const screenId = screen?.id;

		setPendingCodes([code]);
		setPendingScreenIds(screenId !== undefined ? [screenId] : []);
		setCurrentCodeIndex(0);
		setCurrentStepIndex(0);

		const needsSidebarOpen = code === "HOME_GUIDE" && !isSidebarOpen;
		if (needsSidebarOpen) {
			toggleSidebarOpen();
		}

		// Wait for sidebar/layout transition (300ms) to finish before activating
		// onboarding so that tooltip target positions are stable.
		const delay = needsSidebarOpen || isSidebarOpen ? 350 : 0;
		setTimeout(() => {
			setIsActive(true);
		}, delay);
	};

	const finishOnboarding = () => {
		setIsActive(false);
		setIsFinishModalOpen(true);
	};

	const finishCode = (nextCodeIndex: number) => {
		if (nextCodeIndex >= pendingCodes.length) {
			finishOnboarding();
		}
	};

	const nextStep = () => {
		if (!currentCode) {
			return;
		}

		const steps = ONBOARDING_STEPS_BY_CODE[currentCode];
		const nextStepIndex = currentStepIndex + 1;

		if (nextStepIndex >= steps.length) {
			finishCode(currentCodeIndex + 1);
			return;
		}

		setCurrentStepIndex(nextStepIndex);
	};

	const closeOnboarding = () => {
		const code = currentCode;
		setIsActive(false);
		if (code) {
			sessionStorage.setItem(getSessionKey(code), "true");
		}
		reset();
	};

	const cancelOnboarding = () => {
		if (isActive || isFinishModalOpen) {
			reset();
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: cancel only on pathname change, not on isActive/currentCode changes
	useEffect(() => {
		if (!isActive || !currentCode) return;
		const expectedPrefix = ONBOARDING_CODE_PATH_PREFIX[currentCode];
		if (!location.pathname.startsWith(expectedPrefix)) {
			cancelOnboarding();
		}
	}, [location.pathname]);

	const neverShowOnboarding = () => {
		const { pendingCodes: codes, pendingScreenIds: screenIds } =
			useOnboardingStore.getState();
		setIsActive(false);
		for (const code of codes) {
			sessionStorage.setItem(getSessionKey(code), "true");
		}
		reset();
		for (const screenId of screenIds) {
			apiClient.POST("/api/v1/onboarding/screens/view", {
				body: { screenId, dismissed: true },
			});
		}
		queryClient.invalidateQueries({
			queryKey: apiHooks.queryOptions(
				"get",
				"/api/v1/onboarding/screens/unviewed",
				{},
			).queryKey,
		});
	};

	const goToStep = (flatIndex: number) => {
		if (!isActive) return;
		const { codeIndex, stepIndex } = fromFlatIndex(flatIndex);
		const code = pendingCodes[codeIndex];
		if (!code) return;
		setCurrentCodeIndex(codeIndex);
		setCurrentStepIndex(stepIndex);
	};

	const markCompletedForSession = (code: OnboardingCode) => {
		sessionStorage.setItem(getSessionKey(code), "true");
	};

	return {
		isActive,
		isFinishModalOpen,
		isUnviewedLoaded,
		canStartCode,
		currentCode,
		currentStepKey,
		totalSteps,
		currentFlatIndex,
		startOnboardingForCode,
		nextStep,
		goToStep,
		closeOnboarding,
		neverShowOnboarding,
		reset,
		setIsFinishModalOpen,
		markCompletedForSession,
	};
};

export default useOnboarding;
