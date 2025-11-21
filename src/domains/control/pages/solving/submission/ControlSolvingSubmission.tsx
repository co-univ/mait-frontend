import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "@/components/Button";
import { Table } from "@/components/table";
import { Tabs } from "@/components/tabs";
import { apiHooks } from "@/libs/api";
import type { UpdateQuestionStatusApiRequest } from "@/libs/types";
import ControlSolvingSubmissionScorerSideDialog from "./ControlSolvingSubmissionScorerSideDialog";
import ControlSolvingSubmissionTableBody from "./ControlSolvingSubmissionTableBody";
import ControlSolvingSubmissionTableHeader from "./ControlSolvingSubmissionTableHeader";
import ControlSolvingSubmissionTabs from "./ControlSolvingSubmissionTabs";

//
//
//

interface ControlSolvingSubmissionProps {
	questionStatusType?: UpdateQuestionStatusApiRequest["statusType"];
}

const SUBMIT_RECORDS_POLLING_INTERVAL = 5000;

//
//
//

const ControlSolvingSubmission = ({
	questionStatusType,
}: ControlSolvingSubmissionProps) => {
	const [isScorerDialogOpen, setIsScorerDialogOpen] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { data: scorerData } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}/scorers",
		{
			params: {
				path: {
					questionSetId,
					questionId,
				},
			},
		},
		{
			retry: false,
			refetchInterval: (query) => {
				if (
					questionStatusType === "SOLVE_PERMISSION" &&
					query.state.status === "error"
				) {
					return SUBMIT_RECORDS_POLLING_INTERVAL;
				}

				return false;
			},
		},
	);
	const { data: submitRecordsData } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit-records",
		{
			params: {
				path: { questionSetId, questionId },
			},
		},
		{
			refetchInterval:
				questionStatusType === "SOLVE_PERMISSION"
					? SUBMIT_RECORDS_POLLING_INTERVAL
					: false,
		},
	);

	const scorer = scorerData?.data;
	const submitInfos = submitRecordsData?.data;

	const navigate = useNavigate();

	const submitType = searchParams.get("submit-type") || "all";

	/**
	 *
	 */
	const handleScorerDialogOpen = () => {
		setIsScorerDialogOpen(true);
	};

	/**
	 *
	 */
	const handleScorerDialogClose = () => {
		setIsScorerDialogOpen(false);
	};

	/**
	 *
	 */
	const handlePariticipantButtonClick = () => {
		navigate(
			`/control/participant/question-set/${questionSetId}/question/${questionId}`,
		);
	};

	/**
	 *
	 */
	const handleSubmitTypeChange = (type: string) => {
		const validTypes: readonly string[] = ["all", "correct", "incorrect"];
		const submitType = validTypes.includes(type) ? type : "all";

		setSearchParams({
			"submit-type": submitType as "all" | "correct" | "incorrect",
		});
	};

	/**
	 *
	 */
	const renderHeader = () => {
		return (
			<div className="flex justify-between items-start">
				<div className="flex flex-col">
					<h3 className="typo-body-medium text-color-gray-40">득점자</h3>
					<h2 className="typo-heading-medium">{scorer?.userName}</h2>
				</div>
				<div className="flex gap-gap-5">
					<Button
						item="문제별 득점자"
						className="bg-color-primary-5 typo-body-small text-color-primary-50 border-none"
						onClick={handleScorerDialogOpen}
					/>
					<Button
						item="진출자 선정"
						className="bg-color-primary-5 typo-body-small text-color-primary-50 border-none"
						onClick={handlePariticipantButtonClick}
					/>
				</div>
			</div>
		);
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

	/**
	 *
	 */
	const renderBody = () => {
		return (
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
		);
	};

	return (
		<>
			<div className="flex flex-col gap-gap-9 p-padding-11 border border-color-gray-10 rounded-radius-large2">
				{renderHeader()}
				{renderBody()}
			</div>
			<ControlSolvingSubmissionScorerSideDialog
				open={isScorerDialogOpen}
				onClose={handleScorerDialogClose}
			/>
		</>
	);
};

export default ControlSolvingSubmission;
