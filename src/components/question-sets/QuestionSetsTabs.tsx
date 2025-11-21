import { CalendarClock, CalendarPlus, ListTodo } from "lucide-react";
import { Tabs } from "@/components/tabs";

//
//
//

interface QuestionSetsTabsProps {
	modes: ("making" | "live-time" | "review")[];
}

//
//
//

/**
 * Tab list for Question Sets page.
 * Displays tabs for making, review, and live-time modes.
 */
const QuestionSetsTabs = ({ modes }: QuestionSetsTabsProps) => {
	return (
		<Tabs.List>
			{modes.includes("making") && (
				<Tabs.Trigger value="making" icon={<CalendarPlus />}>
					문제 생성
				</Tabs.Trigger>
			)}
			{modes.includes("live-time") && (
				<Tabs.Trigger value="live-time" icon={<CalendarClock />}>
					실시간 풀이
				</Tabs.Trigger>
			)}
			{modes.includes("review") && (
				<Tabs.Trigger value="review" icon={<ListTodo />}>
					복습
				</Tabs.Trigger>
			)}
		</Tabs.List>
	);
};

export default QuestionSetsTabs;
