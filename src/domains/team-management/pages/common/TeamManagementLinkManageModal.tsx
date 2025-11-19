import { Square } from "lucide-react";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import Modal from "@/components/modal/Modal";
import { Table } from "@/components/table";
import CopyButton from "../../components/common/CopyButton";

//
//
//

interface TeamManagementLinkManageModalProps {
	open: boolean;
	onClose: () => void;
}

//
//
//

const TeamManagementLinkManageModal = ({
	open,
	onClose,
}: TeamManagementLinkManageModalProps) => {
	/**
	 *
	 */
	const renderModalHeader = () => {
		return (
			<div>
				<h3 className="typo-body-small text-color-gray-40">생성 링크</h3>
				<h2 className="typo-heading-medium">초대 링크 관리</h2>
			</div>
		);
	};

	/**
	 *
	 */
	const renderTable = () => {
		return (
			<Table.Root>
				<Table.Header>
					<Table.HeaderCell width="32px">
						<Square size={20} />
					</Table.HeaderCell>
					<Table.HeaderCell width="112px">권한</Table.HeaderCell>
					<Table.HeaderCell grow>링크</Table.HeaderCell>
					<Table.HeaderCell width="160px">링크</Table.HeaderCell>
				</Table.Header>

				<Table.Divider />

				<Table.Body>
					<Table.Row>
						<Table.Cell width="32px" className="flex items-center">
							<DeleteCheckBox size={20} />
						</Table.Cell>
						<Table.Cell width="112px">메이커</Table.Cell>
						<Table.Cell grow className="flex gap-gap-5">
							<span className="truncate w-0 flex-1">
								https://mait.co/invite/abcd1234sdfsafdsf
							</span>
							<CopyButton value="https://mait.co/invite/abcd1234sdfsafdsf" />
						</Table.Cell>
						<Table.Cell width="160px">2024-12-31 23:59</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		);
	};
	return (
		<Modal open={open} onClose={onClose}>
			<div className="w-[600px] flex flex-col gap-gap-9">
				{renderModalHeader()}
				{renderTable()}
			</div>
		</Modal>
	);
};

export default TeamManagementLinkManageModal;
