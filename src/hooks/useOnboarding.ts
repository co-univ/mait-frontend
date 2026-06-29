import { useNavigate } from "react-router-dom";
import {
	ONBOARDING_CODE_ORDER,
	ONBOARDING_STEPS_BY_CODE,
	type OnboardingCode,
	QUESTION_MANAGE_PARTICIPANT_START_INDEX,
} from "@/components/onboarding/onboarding.config";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
import { HOME_ROUTE_PATH } from "@/domains/home/home.routes";
import { SOLVING_ROUTE_PATH } from "@/domains/solving/solving.routes";
import { apiHooks } from "@/libs/api";
import useOnboardingStore from "@/stores/useOnboardingStore";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { createPath } from "@/utils/create-path";

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
			{ staleTime: Infinity },
		);

	//
	//
	//

	const currentCode = pendingCodes[currentCodeIndex] ?? null;
	const currentStepKey = currentCode
		? (ONBOARDING_STEPS_BY_CODE[currentCode][currentStepIndex] ?? null)
		: null;

	const canStart =
		!isActive && !isFinishModalOpen && pendingCodes.length === 0;

	//
	//
	//

	/**
	 * 
	 */
	const startOnboarding = () => {
		if (!canStart) {
			return;
		}

		const unviewedScreens = unviewedScreensData?.data ?? [];

		const unviewedCodes = unviewedScreens
			.map((s) => s.code)
			.filter((code): code is OnboardingCode => code !== undefined);

		const orderedCodes = ONBOARDING_CODE_ORDER.filter((code) =>
			unviewedCodes.includes(code),
		);

		if (orderedCodes.length === 0) {
			return;
		}

		const screenIds = unviewedScreens
			.map((s) => s.id)
			.filter((id): id is number => id !== undefined);

		const firstCode = orderedCodes[0];

		setPendingCodes(orderedCodes);
		setPendingScreenIds(screenIds);
		setCurrentCodeIndex(0);
		setCurrentStepIndex(0);
		setIsActive(true);

		if (firstCode === "HOME_GUIDE" && !isSidebarOpen) {
			toggleSidebarOpen();
		}

		navigate(getOnboardingPath(firstCode, 0));
	};


	/**
	 * 
	 */
	const finishOnboarding = () => {
		setIsActive(false);
		setIsFinishModalOpen(true);
		navigate(HOME_ROUTE_PATH.ROOT);
	};

	/**
	 * 
	 */
	const finishCode = (nextCodeIndex: number) => {
		if (nextCodeIndex >= pendingCodes.length) {
			finishOnboarding();
			return;
		}

		const nextCode = pendingCodes[nextCodeIndex];

		setCurrentCodeIndex(nextCodeIndex);
		setCurrentStepIndex(0);
		navigate(getOnboardingPath(nextCode, 0));

		if (nextCode === "HOME_GUIDE" && !isSidebarOpen) {
			toggleSidebarOpen();
		}
	};

	/**
	 * 
	 */
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
			navigate(getOnboardingPath(currentCode, nextStepIndex));
		}

		setCurrentStepIndex(nextStepIndex);
	};

	return {
		isActive,
		isFinishModalOpen,
		isUnviewedLoaded,
		canStart,
		currentCode,
		currentStepKey,
		startOnboarding,
		nextStep,
		reset,
		setIsFinishModalOpen,
	};
};

export default useOnboarding;
