import type { ReactNode } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Table } from "@/components/table";
import { Tabs } from "@/components/tabs";
import { apiHooks } from "@/libs/api";
import ControlSolvingSubmissionTableBody from "./ControlSolvingSubmissionTableBody";
import ControlSolvingSubmissionTableHeader from "./ControlSolvingSubmissionTableHeader";
import ControlSolvingSubmissionTabs from "./ControlSolvingSubmissionTabs";

//
//
//

interface ControlSolvingSubmissionPanelProps {
	headerContent?: ReactNode;
	pollingInterval?: number | false;
}

//
//
//

const ControlSolvingSubmissionPanel = ({
	headerContent,
	pollingInterval = false,
}: ControlSolvingSubmissionPanelProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { data: submitRecordsData } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit-records",
		{
			params: {
				path: { questionSetId, questionId },
			},
		},
		{
			refetchInterval: pollingInterval,
		},
	);

	const submitInfos = submitRecordsData?.data;

	const submitType = searchParams.get("submit-type") || "all";

	/**
	 *
	 */
	const handleSubmitTypeChange = (type: string) => {
		const validTypes: readonly string[] = ["all", "correct", "incorrect"];
		const resolved = validTypes.includes(type) ? type : "all";

		setSearchParams({
			"submit-type": resolved as "all" | "correct" | "incorrect",
		});
	};

	/**
	 *
	 */
	const renderTabContent = () => {
		return (
			<Table.Root>
				<ControlSolvingSubmissionTableHeader />
				<Table.Divider />
				<ControlSolvingSubmissionTableBody
					submitType={submitType as "all" | "correct" | "incorrect"}
					submitRecords={submitInfos?.submitRecords}
				/>
			</Table.Root>
		);
	};

	return (
		<div className="flex flex-col gap-gap-9 p-padding-11 border border-color-gray-10 rounded-radius-large2">
			{headerContent}
			<Tabs.Root
				defaultValue="all"
				onValueChange={(value) =>
					handleSubmitTypeChange(value as "all" | "correct" | "incorrect")
				}
				className="flex flex-col gap-gap-9"
			>
				<ControlSolvingSubmissionTabs
					correctUserCounts={submitInfos?.correctUserCounts}
					incorrectUserCounts={submitInfos?.incorrectUserCounts}
				/>

				{(["all", "correct", "incorrect"] as const).map((value) => (
					<Tabs.Content key={value} value={value}>
						{renderTabContent()}
					</Tabs.Content>
				))}
			</Tabs.Root>
		</div>
	);
};

export default ControlSolvingSubmissionPanel;
