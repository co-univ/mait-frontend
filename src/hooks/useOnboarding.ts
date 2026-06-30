import { useNavigate } from "react-router-dom";
import {
	ONBOARDING_STEPS_BY_CODE,
	type OnboardingCode,
	QUESTION_MANAGE_PARTICIPANT_START_INDEX,
} from "@/components/onboarding/onboarding.config";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
import { SOLVING_ROUTE_PATH } from "@/domains/solving/solving.routes";
import { apiHooks } from "@/libs/api";
import useOnboardingStore from "@/stores/useOnboardingStore";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { createPath } from "@/utils/create-path";

const getSessionKey = (code: OnboardingCode) =>
	`onboarding-completed-session-${code}`;

//
//
//

const DUMMY_QUESTION_SET_ID = 0;
const DUMMY_QUESTION_ID = 0;

const getOnboardingPath = (code: OnboardingCode, stepIndex: number): string => {
	if (code === "HOME_GUIDE" || code === "QUESTION_SOLVE") {
		return SOLVING_ROUTE_PATH.QUESTION_SETS;
	}

	if (stepIndex >= QUESTION_MANAGE_PARTICIPANT_START_INDEX) {
		return createPath(CONTROL_ROUTE_PATH.LIVE_PARTICIPANT, {
			questionSetId: DUMMY_QUESTION_SET_ID,
			questionId: DUMMY_QUESTION_ID,
		});
	}

	return createPath(CONTROL_ROUTE_PATH.LIVE_SOLVING, {
		questionSetId: DUMMY_QUESTION_SET_ID,
		questionId: DUMMY_QUESTION_ID,
	});
};

//
//
//

const useOnboarding = () => {
	const navigate = useNavigate();

	const {
		pendingCodes,
		currentCodeIndex,
		currentStepIndex,
		isActive,
		isFinishModalOpen,
		questionManageIds,
		setPendingCodes,
		setPendingScreenIds,
		setCurrentCodeIndex,
		setCurrentStepIndex,
		setIsActive,
		setIsFinishModalOpen,
		setQuestionManageIds,
		reset,
	} = useOnboardingStore();

	const { isSidebarOpen, toggleSidebarOpen } = useSidebarOpenStore();

	const { data: unviewedScreensData, isSuccess: isUnviewedLoaded } =
		apiHooks.useQuery(
			"get",
			"/api/v1/onboarding/screens/unviewed",
			{},
			{ staleTime: Infinity },
		);

	//
	//
	//

	const currentCode = pendingCodes[currentCodeIndex] ?? null;
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
		ids?: { questionSetId: number; questionId: number },
	) => {
		if (!canStartCode(code)) {
			return;
		}

		const unviewedScreens = unviewedScreensData?.data ?? [];
		const screen = unviewedScreens.find((s) => s.code === code);
		const screenId = screen?.id;

		setPendingCodes([code]);
		setPendingScreenIds(screenId !== undefined ? [screenId] : []);
		setCurrentCodeIndex(0);
		setCurrentStepIndex(0);

		if (code === "QUESTION_MANAGE" && ids) {
			setQuestionManageIds(ids);
		}

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

		// After QUESTION_MANAGE participant steps, navigate back to the solving page
		const code = pendingCodes[currentCodeIndex];
		if (
			code === "QUESTION_MANAGE" &&
			currentStepIndex >= QUESTION_MANAGE_PARTICIPANT_START_INDEX
		) {
			const ids = questionManageIds ?? {
				questionSetId: DUMMY_QUESTION_SET_ID,
				questionId: DUMMY_QUESTION_ID,
			};
			navigate(
				createPath(CONTROL_ROUTE_PATH.LIVE_SOLVING, ids),
			);
		}
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

		if (
			currentCode === "QUESTION_MANAGE" &&
			nextStepIndex === QUESTION_MANAGE_PARTICIPANT_START_INDEX
		) {
			const ids = questionManageIds ?? {
				questionSetId: DUMMY_QUESTION_SET_ID,
				questionId: DUMMY_QUESTION_ID,
			};
			navigate(
				createPath(CONTROL_ROUTE_PATH.LIVE_PARTICIPANT, ids),
			);
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

	const goToStep = (flatIndex: number) => {
		if (!isActive) return;
		const { codeIndex, stepIndex } = fromFlatIndex(flatIndex);
		const code = pendingCodes[codeIndex];
		if (!code) return;
		setCurrentCodeIndex(codeIndex);
		setCurrentStepIndex(stepIndex);

		if (
			code === "QUESTION_MANAGE" &&
			stepIndex >= QUESTION_MANAGE_PARTICIPANT_START_INDEX
		) {
			const ids = questionManageIds ?? {
				questionSetId: DUMMY_QUESTION_SET_ID,
				questionId: DUMMY_QUESTION_ID,
			};
			navigate(createPath(CONTROL_ROUTE_PATH.LIVE_PARTICIPANT, ids));
		} else if (
			code === "QUESTION_MANAGE" &&
			stepIndex < QUESTION_MANAGE_PARTICIPANT_START_INDEX
		) {
			const ids = questionManageIds ?? {
				questionSetId: DUMMY_QUESTION_SET_ID,
				questionId: DUMMY_QUESTION_ID,
			};
			navigate(createPath(CONTROL_ROUTE_PATH.LIVE_SOLVING, ids));
		} else {
			navigate(getOnboardingPath(code, stepIndex));
		}
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
		reset,
		setIsFinishModalOpen,
		markCompletedForSession,
	};
};

export default useOnboarding;
