import { SquarePen } from "lucide-react";
import QuestionSetsTabs from "@/components/question-sets/QuestionSetsTabs";
import { Tabs } from "@/components/tabs";
import useQuestionSets from "@/hooks/useQuestionSets";
import useQuestionSetTabMode from "@/hooks/useQuestionSetTabMode";
import useStudyQuestionSets from "@/hooks/useStudyQuestionSets";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import ManagementCreateQuestionButton from "../../components/common/ManagementCreateQuestionButton";
import ManagementLiveTime from "./ManagementLiveTime";
import ManagementMaking from "./ManagementMaking";
import ManagementReview from "./ManagementReview";
import ManagementStudy from "./ManagementStudy";

//
//
//

const Management = () => {
	const { activeTeam } = useTeams();

	const { mode, deliveryMode, handleModeChange } = useQuestionSetTabMode(
		["making", "live-time", "study", "review"],
		"making",
	);

	const {
		questionSetList,
		questionSetGroup,
		invalidateQuestionSetsQuery,
		isLoading,
	} = useQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		mode: deliveryMode,
	});

	const {
		questionSetGroup: studyQuestionSetGroup,
		invalidateQuestionSetsQuery: studyInvalidateQuestionSetsQuery,
		isLoading: studyIsLoading,
	} = useStudyQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		target: "management",
	});

	return (
		<LabeledPageLayout icon={<SquarePen />} label="문제 관리">
			<Tabs.Root
				value={mode}
				onValueChange={handleModeChange}
				className="flex flex-col gap-gap-11"
			>
				<div className="flex justify-between items-end">
					<QuestionSetsTabs
						modes={["making", "live-time", "study", "review"]}
					/>
					<ManagementCreateQuestionButton />
				</div>

				<Tabs.Content value="making">
					<ManagementMaking
						questionSets={questionSetList ?? []}
						invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
						isLoading={isLoading}
					/>
				</Tabs.Content>

				<Tabs.Content value="live-time">
					<ManagementLiveTime
						questionSetGroup={questionSetGroup}
						invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
						isLoading={isLoading}
					/>
				</Tabs.Content>

				<Tabs.Content value="study">
					<ManagementStudy
						questionSetGroup={studyQuestionSetGroup}
						invalidateQuestionSetsQuery={studyInvalidateQuestionSetsQuery}
						isLoading={studyIsLoading}
					/>
				</Tabs.Content>

				<Tabs.Content value="review">
					<ManagementReview
						questionSets={questionSetList ?? []}
						invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
						isLoading={isLoading}
					/>
				</Tabs.Content>
			</Tabs.Root>
		</LabeledPageLayout>
	);
};

export default Management;
