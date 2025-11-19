import { Circle } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { Table } from "@/components/table";
import { Tabs } from "@/components/tabs";
import ControlSolvingSubmissionScorerSideDialog from "./ControlSolvingSubmissionScorerSideDialog";
import ControlSolvingSubmissionTabs from "./ControlSolvingSubmissionTabs";

//
//
//

const ControlSolvingSubmission = () => {
	const [isScorerDialogOpen, setIsScorerDialogOpen] = useState(false);

	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleScorerDialogOpen = () => {
		setIsScorerDialogOpen(true);
	};

	/**
	 *
	 */
	const handlePariticipantButtonClick = () => {
		navigate(
			`/control/participant/team/${teamId}/question-set/${questionSetId}/question/${questionId}`,
		);
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
	const renderHeader = () => {
		return (
			<div className="flex justify-between items-start">
				<div className="flex flex-col">
					<h3 className="typo-body-medium text-color-gray-40">득점자</h3>
					<h2 className="typo-heading-medium">전민재</h2>
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
	const renderBody = () => {
		return (
			<Tabs.Root defaultValue="all" className="flex flex-col gap-gap-9">
				<ControlSolvingSubmissionTabs />

				<Tabs.Content value="all">
					<Table.Root>
						<Table.Header>
							<Table.HeaderCell>
								<Circle size={16} className="px-padding-1 drop-shadow-md" />
							</Table.HeaderCell>
							<Table.HeaderCell width="100px">이름</Table.HeaderCell>
							<Table.HeaderCell grow>선택 답안</Table.HeaderCell>
							<Table.HeaderCell width="158px">닉네임</Table.HeaderCell>
						</Table.Header>
						<Table.Divider />
						<Table.Body>
							<Table.Row>
								<Table.Cell>
									<Circle
										size={16}
										className="px-padding-1 drop-shadow-md fill-color-danger-50 text-color-danger-50"
									/>
								</Table.Cell>
								<Table.Cell width="100px">이하은</Table.Cell>
								<Table.Cell grow className="typo-body-small-bold">
									<span className="ml-padding-4">2,3</span>
								</Table.Cell>
								<Table.Cell width="158px">귀여운 감자</Table.Cell>
							</Table.Row>
							<Table.Divider />
							<Table.Row>
								<Table.Cell>
									<Circle
										size={16}
										className="px-padding-1 drop-shadow-md fill-color-success-50 text-color-success-50"
									/>
								</Table.Cell>
								<Table.Cell width="100px">전민재</Table.Cell>
								<Table.Cell grow className="typo-body-small-bold">
									<span className="ml-padding-4 text-color-success-50">2</span>
								</Table.Cell>
								<Table.Cell width="158px" className="truncate">
									귀엽고 깜찍한 유니브먀앙
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Tabs.Content>
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
