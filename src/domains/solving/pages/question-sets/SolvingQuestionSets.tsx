import { SquarePen } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import QuestionSetsTabs from "@/components/question-sets/QuestionSetsTabs";
import { Tabs } from "@/components/tabs";
import useQuestionSets from "@/hooks/useQuestionSets";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import type { DeliveryMode } from "@/libs/types";
import SolvingQuestionSetsLiveTime from "./SolvingQuestionSetsLiveTime";

//
//
//

const QUESTION_SET_MODES: Record<string, DeliveryMode> = {
	"live-time": "LIVE_TIME",
	review: "REVIEW",
};

//
//
//

const SolvingQuestionSets = () => {
	const { activeTeam } = useTeams();
	const [searchParams, setSearchParams] = useSearchParams();
	const mode = searchParams.get("mode") || "live-time";

	const { questionSetList, questionSetGroup } = useQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		mode: QUESTION_SET_MODES[mode],
	});

	/**
	 *
	 */
	const handleModeChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set("mode", value);

		setSearchParams(newParams);
	};

	return (
		<LabeledPageLayout icon={<SquarePen />} label="문제 풀기">
			<Tabs.Root
				value={mode}
				onValueChange={handleModeChange}
				className="flex flex-col gap-gap-11"
			>
				<QuestionSetsTabs modes={["live-time", "review"]} />

				<Tabs.Content value="live-time">
					<SolvingQuestionSetsLiveTime questionSetGroup={questionSetGroup} />
				</Tabs.Content>

				<Tabs.Content value="review">
					<div />
					{/* <ManagementLiveTime questionSetGroup={questionSetGroup} /> */}
				</Tabs.Content>
			</Tabs.Root>
		</LabeledPageLayout>
	);
};

export default SolvingQuestionSets;
