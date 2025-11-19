import { Puzzle } from "lucide-react";
import SideDialog from "@/components/side-dialog/SideDialog";
import { Table } from "@/components/table";

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
	return (
		<SideDialog open={open} onClose={onClose}>
			<div className="flex flex-col gap-gap-9">
				<div>
					<h3 className="typo-body-medium text-color-gray-40">8차시 교육</h3>
					<h2 className="typo-heading-medium">문제별 득점자</h2>
				</div>
				<Table.Root>
					<Table.Header>
						<Table.HeaderCell width="100px">문제</Table.HeaderCell>
						<Table.HeaderCell width="240px">선착순 득점자</Table.HeaderCell>
					</Table.Header>
					<Table.Divider />
					<Table.Body>
						<Table.Row>
							<Table.Cell
								width="100px"
								className="flex gap-gap-5 items-center text-color-primary-50 typo-body-small-bold"
							>
								<Puzzle size={20} />
								Q1
							</Table.Cell>
							<Table.Cell width="240px" className="truncate">
								전민재 (귀여운 감자 감자 감자 감자 감자 감자 감자 감자)
							</Table.Cell>
						</Table.Row>
						<Table.Divider />
						<Table.Row>
							<Table.Cell
								width="100px"
								className="flex gap-gap-5 items-center text-color-primary-50 typo-body-small-bold"
							>
								<Puzzle size={20} />
								Q2
							</Table.Cell>
							<Table.Cell width="240px" className="truncate">
								원영턴 (장원영)
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</div>
		</SideDialog>
	);
};

export default ControlSolvingSubmissionScorerSideDialog;
