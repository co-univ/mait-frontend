import type { Placement } from "@floating-ui/react-dom";
import type { ReactNode } from "react";
import OnboardingBadge from "@/assets/icons/onboarding-badge.svg";
import OnboardingBell from "@/assets/icons/onboarding-bell.svg";
import OnboardingChart from "@/assets/icons/onboarding-chart.svg";
import OnboardingCheckCircle from "@/assets/icons/onboarding-check-circle.svg";
import OnboardingClipboard from "@/assets/icons/onboarding-clipboard.svg";
import OnboardingDocument from "@/assets/icons/onboarding-document.svg";
import OnboardingGift from "@/assets/icons/onboarding-gift.svg";
import OnboardingLock from "@/assets/icons/onboarding-lock.svg";
import OnboardingMenu from "@/assets/icons/onboarding-menu.svg";
import OnboardingPencil from "@/assets/icons/onboarding-pencil.svg";
import OnboardingPuzzle from "@/assets/icons/onboarding-puzzle.svg";
import OnboardingRemoveCircle from "@/assets/icons/onboarding-remove-circle.svg";
import OnboardingSearch from "@/assets/icons/onboarding-search.svg";
import OnboardingSmiley from "@/assets/icons/onboarding-smiley.svg";
import OnboardingUpload from "@/assets/icons/onboarding-upload.svg";
import OnboardingUser from "@/assets/icons/onboarding-user.svg";

//
//
//

export type OnboardingCode =
	| "HOME_GUIDE"
	| "QUESTION_SOLVE"
	| "QUESTION_MANAGE";

export const ONBOARDING_CODE_ORDER: OnboardingCode[] = [
	"HOME_GUIDE",
	"QUESTION_SOLVE",
	"QUESTION_MANAGE",
];

export const ONBOARDING_STEPS_BY_CODE: Record<OnboardingCode, string[]> = {
	HOME_GUIDE: ["solve", "dashboard", "management"],
	QUESTION_SOLVE: ["live", "study", "review"],
	QUESTION_MANAGE: [
		"access-open",
		"access-solve",
		"submission",
		"scorer",
		"winner",
		"live-scorer",
		"correct-scorer",
		"participant",
		"submit-participant",
		"submit-winner",
	],
};

// This step in QUESTION_MANAGE switches to the /control/live/participant/... path
export const QUESTION_MANAGE_PARTICIPANT_START_INDEX = 5; // "live-scorer"

//
//
//

export interface OnboardingStep {
	description: string;
	icon: ReactNode;
	placement?: Placement;
}

export const ONBOARDING_STEPS: Record<string, OnboardingStep> = {
	// HOME_GUIDE
	solve: {
		description: "만든 문제셋을 풀어볼 수 있어요!",
		icon: <OnboardingPencil />,
		placement: "right",
	},
	dashboard: {
		description: "내 풀이 결과와 학습 현황 데이터를 한눈에 확인할 수 있어요",
		icon: <OnboardingChart />,
		placement: "right",
	},
	management: {
		description: "팀원 정보를 확인할 수 있어요!",
		icon: <OnboardingUser />,
		placement: "right",
	},

	// QUESTION_GUIDE
	live: {
		description: "팀원들과 함께 선착순으로 문제를 풀어요!",
		icon: <OnboardingBell />,
		placement: "bottom",
	},
	study: {
		description: "각자 원하는 시간에 문제를 풀어요",
		icon: <OnboardingClipboard />,
		placement: "bottom",
	},
	review: {
		description: "이전에 풀었던 문제를 다시 풀어요!",
		icon: <OnboardingCheckCircle />,
		placement: "bottom",
	},
	// new: {
	// 	description: "새로운 문제 셋을 생성해보세요!",
	// 	icon: <OnboardingAddCircle />,
	// 	placement: "bottom",
	// },

	// QUESTION_MANAGE
	"access-open": {
		description: "Player에게 문제가 공개돼요",
		icon: <OnboardingLock />,
		placement: "bottom",
	},
	"access-solve": {
		description: "Player가 문제를 제출할 수 있어요",
		icon: <OnboardingUpload />,
		placement: "top",
	},
	submission: {
		description:
			"실시간 모드에서는 가장 빠르게 답을 제출한 인원이 득점자가 돼요",
		icon: <OnboardingSmiley />,
		placement: "top",
	},
	scorer: {
		description: "문제별 득점자 정보를 확인할 수 있어요",
		icon: <OnboardingSearch />,
		placement: "bottom",
	},
	winner: {
		description: "다음 단계 진출자 또는 우승자를 선정할 수 있어요",
		icon: <OnboardingBadge />,
		placement: "top",
	},
	"live-scorer": {
		description: "가장 빠르게 정답을 제출한 순서대로 측정돼요",
		icon: <OnboardingDocument />,
		placement: "bottom",
	},
	"correct-scorer": {
		description:
			"등수를 선택하거나 입력해 ’다음 진출자’를 선정할 수 있어요. 직접 추가도 가능해요",
		icon: <OnboardingPuzzle />,
		placement: "bottom",
	},
	participant: {
		description: "해당 인원을 다음 단계 진출자 또는 우승자로 선정할 수 있어요",
		icon: <OnboardingGift />,
		placement: "bottom",
	},
	"submit-participant": {
		description: "해당 인원을 다음 단계 진출자 또는 우승자로 선정할 수 있어요",
		icon: <OnboardingMenu />,
		placement: "bottom",
	},
	"submit-winner": {
		description:
			"우승자를 선정하면 player에게 우승자 정보가 전달되고 문제셋이 종료돼요",
		icon: <OnboardingRemoveCircle />,
		placement: "bottom",
	},
};
