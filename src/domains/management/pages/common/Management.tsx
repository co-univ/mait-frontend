import { SquarePen } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import QuestionSetsTabs from "@/components/question-sets/QuestionSetsTabs";
import { Tabs } from "@/components/tabs";
import useQuestionSets from "@/hooks/useQuestionSets";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import type { DeliveryMode } from "@/libs/types";
import ManagementLiveTime from "./ManagementLiveTime";
import ManagementMaking from "./ManagementMaking";

//
//
//

const QUESTION_SET_MODES: Record<string, DeliveryMode> = {
	making: "MAKING",
	"live-time": "LIVE_TIME",
	review: "REVIEW",
};

//
//
//

const Management = () => {
	const { activeTeam } = useTeams();
	const [searchParams, setSearchParams] = useSearchParams();
	const mode = searchParams.get("mode") || "making";

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
		<LabeledPageLayout icon={<SquarePen />} label="문제 관리">
			<Tabs.Root
				value={mode}
				onValueChange={handleModeChange}
				className="flex flex-col gap-gap-11"
			>
				<QuestionSetsTabs />

				<Tabs.Content value="making">
					<ManagementMaking questionSets={questionSetList ?? []} />
				</Tabs.Content>

				<Tabs.Content value="live-time">
					<ManagementLiveTime questionSetGroup={questionSetGroup} />
				</Tabs.Content>

				<Tabs.Content value="review">
					<ManagementMaking questionSets={questionSetList ?? []} />
				</Tabs.Content>
			</Tabs.Root>
		</LabeledPageLayout>
	);
};

export default Management;
