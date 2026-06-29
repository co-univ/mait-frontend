import {
	CalendarClock,
	CalendarPlus,
	ListTodo,
	PencilRuler,
} from "lucide-react";
import Onboarding from "@/components/onboarding/Onboarding";
import { Tabs } from "@/components/tabs";
import useOnboarding from "@/hooks/useOnboarding";

//
//
//

interface QuestionSetsTabsProps {
	modes: ("making" | "live-time" | "study" | "review")[];
}

//
//
//

/**
 * Tab list for Question Sets page.
 * Displays tabs for making, review, and live-time modes.
 */
const QuestionSetsTabs = ({ modes }: QuestionSetsTabsProps) => {
	const { isActive, currentStepKey, nextStep } = useOnboarding();

	return (
		<Tabs.List>
			{modes.includes("making") && (
				<Tabs.Trigger value="making" icon={<CalendarPlus />}>
					문제 생성
				</Tabs.Trigger>
			)}
			{modes.includes("live-time") && (
				<Onboarding
					stepKey="live"
					show={isActive && currentStepKey === "live"}
					onNext={nextStep}
				>
					<Tabs.Trigger value="live-time" icon={<CalendarClock />}>
						실시간 풀이
					</Tabs.Trigger>
				</Onboarding>
			)}
			{modes.includes("study") && (
				<Onboarding
					stepKey="study"
					show={isActive && currentStepKey === "study"}
					onNext={nextStep}
				>
					<Tabs.Trigger value="study" icon={<PencilRuler />}>
						학습모드
					</Tabs.Trigger>
				</Onboarding>
			)}
			{modes.includes("review") && (
				<Onboarding
					stepKey="review"
					show={isActive && currentStepKey === "review"}
					onNext={nextStep}
				>
					<Tabs.Trigger value="review" icon={<ListTodo />}>
						복습
					</Tabs.Trigger>
				</Onboarding>
			)}
		</Tabs.List>
	);
};

export default QuestionSetsTabs;
