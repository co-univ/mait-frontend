import { Puzzle } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SideDialog from "@/components/side-dialog/SideDialog";
import { Table } from "@/components/table";
import useControlSolvingQuestion from "@/domains/control/hooks/solving/question/useControlSolvingQuestion";
import { apiHooks } from "@/libs/api";

//
//
//

interface ControlSolvingSubmissionScorerSideDialogProps {
	open: boolean;
	onClose: () => void;
}

//
//
//

const ControlSolvingSubmissionScorerSideDialog = ({
	open,
	onClose,
}: ControlSolvingSubmissionScorerSideDialogProps) => {
	const questionSetId = Number(useParams().questionSetId);

	const { data: questionSetData } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const { data: scorersData, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/scorers",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const scorers = scorersData?.data || [];

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: refetch on dialog is opened
	useEffect(() => {
		if (open) {
			refetch();
		}
	}, [open]);

	return (
		<SideDialog open={open} onClose={onClose}>
			<div className="flex flex-col gap-gap-9">
				<div>
					<h3 className="typo-body-medium text-color-gray-40">
						{questionSetData?.data?.title}
					</h3>
					<h2 className="typo-heading-medium">문제별 득점자</h2>
				</div>
				<Table.Root>
					<Table.Header>
						<Table.HeaderCell width="100px">문제</Table.HeaderCell>
						<Table.HeaderCell width="240px">선착순 득점자</Table.HeaderCell>
					</Table.Header>
					<Table.Divider />
					<Table.Body>
						{scorers.map((scorer, index) => (
							<>
								<Table.Row key={scorer.id}>
									<Table.Cell
										width="100px"
										className="flex gap-gap-5 items-center text-color-primary-50 typo-body-small-bold"
									>
										<Puzzle size={20} />
										{`Q${scorer.questionNumber}`}
									</Table.Cell>
									<Table.Cell width="240px" className="truncate">
										{scorer.userName}
									</Table.Cell>
								</Table.Row>
								{index < scorers.length - 1 && <Table.Divider />}
							</>
						))}
					</Table.Body>
				</Table.Root>
			</div>
		</SideDialog>
	);
};

export default ControlSolvingSubmissionScorerSideDialog;
