import CheckBox from "@/components/CheckBox";
import { Table } from "@/components/table";

//
//
//

interface ControlParticipantRankingPanelTableRowProps {
	checked: boolean;
	rankCell: React.ReactNode;
	nameCell: React.ReactNode;
	onChange: (checked: boolean) => void;
}

//
//
//

const ControlParticipantRankingPanelTableRow = ({
	checked,
	rankCell,
	nameCell,
	onChange,
}: ControlParticipantRankingPanelTableRowProps) => {
	return (
		<Table.Row>
			<Table.Cell width="32px" className="flex items-center">
				<CheckBox checked={checked} size={20} onChange={onChange} />
			</Table.Cell>
			<Table.Cell width="100px">{rankCell}</Table.Cell>
			<Table.Cell grow>{nameCell}</Table.Cell>
		</Table.Row>
	);
};

export default ControlParticipantRankingPanelTableRow;
