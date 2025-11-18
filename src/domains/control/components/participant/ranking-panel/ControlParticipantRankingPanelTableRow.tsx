import CheckBox from "@/components/CheckBox";
import { Table } from "@/components/table";

//
//
//

interface ControlParticipantRankingPanelTableRowProps {
	rankCell: React.ReactNode;
	nameCell: React.ReactNode;
}

//
//
//

const ControlParticipantRankingPanelTableRow = ({
	rankCell,
	nameCell,
}: ControlParticipantRankingPanelTableRowProps) => {
	return (
		<Table.Row>
			<Table.Cell width="32px" className="flex items-center">
				<CheckBox checked={false} size={20} onChange={() => {}} />
			</Table.Cell>
			<Table.Cell width="100px">{rankCell}</Table.Cell>
			<Table.Cell grow>{nameCell}</Table.Cell>
		</Table.Row>
	);
};

export default ControlParticipantRankingPanelTableRow;
