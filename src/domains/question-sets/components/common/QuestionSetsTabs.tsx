import { CalendarClock, CalendarPlus, ListTodo } from "lucide-react";
import { Tabs } from "@/components/Tabs";

//
//
//

/**
 * Tab list for Question Sets page.
 * Displays tabs for making, review, and live-time modes.
 */
const QuestionSetsTabs = () => {
	return (
		<Tabs.List>
			<Tabs.Trigger value="making" icon={<CalendarPlus />}>
				문제 생성
			</Tabs.Trigger>
			<Tabs.Trigger value="live-time" icon={<CalendarClock />}>
				실시간 풀이
			</Tabs.Trigger>
			<Tabs.Trigger value="review" icon={<ListTodo />}>
				복습
			</Tabs.Trigger>
		</Tabs.List>
	);
};

export default QuestionSetsTabs;
