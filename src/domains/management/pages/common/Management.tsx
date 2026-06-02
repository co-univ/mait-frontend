import { SquarePen } from "lucide-react";
import QuestionSetsTabs from "@/components/question-sets/QuestionSetsTabs";
import { Tabs } from "@/components/tabs";
import useQuestionSets from "@/hooks/useQuestionSets";
import useQuestionSetTabMode, {
	type QuestionSetTabMode,
} from "@/hooks/useQuestionSetTabMode";
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

	const validModes = (
		activeTeam?.teamType === "PERSONAL"
			? ["making", "study", "review"]
			: ["making", "live-time", "study", "review"]
	) as QuestionSetTabMode[];

	const { mode, deliveryMode, handleModeChange } = useQuestionSetTabMode(
		validModes,
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
					<QuestionSetsTabs modes={validModes} />
					<ManagementCreateQuestionButton />
				</div>

				{validModes.includes("making") && (
					<Tabs.Content value="making">
						<ManagementMaking
							questionSets={questionSetList ?? []}
							invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
							isLoading={isLoading}
						/>
					</Tabs.Content>
				)}

				{validModes.includes("live-time") && (
					<Tabs.Content value="live-time">
						<ManagementLiveTime
							questionSetGroup={questionSetGroup}
							invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
							isLoading={isLoading}
						/>
					</Tabs.Content>
				)}

				{validModes.includes("study") && (
					<Tabs.Content value="study">
						<ManagementStudy
							questionSetGroup={studyQuestionSetGroup}
							invalidateQuestionSetsQuery={studyInvalidateQuestionSetsQuery}
							isLoading={studyIsLoading}
						/>
					</Tabs.Content>
				)}

				{validModes.includes("review") && (
					<Tabs.Content value="review">
						<ManagementReview
							questionSets={questionSetList ?? []}
							invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
							isLoading={isLoading}
						/>
					</Tabs.Content>
				)}
			</Tabs.Root>
		</LabeledPageLayout>
	);
};

export default Management;
