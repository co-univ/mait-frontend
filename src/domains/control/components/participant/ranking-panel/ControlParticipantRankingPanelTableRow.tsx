import CheckBox from "@/components/CheckBox";
import { Table } from "@/components/table";

//
//
//

const ControlParticipantRankingPanelTableRow = () => {
	return (
		<Table.Row>
			<Table.Cell width="32px" className="flex items-center">
				<CheckBox checked={false} size={20} onChange={() => {}} />
			</Table.Cell>
			<Table.Cell width="100px">1등</Table.Cell>
			<Table.Cell grow>조원영</Table.Cell>
		</Table.Row>
	);
};

export default ControlParticipantRankingPanelTableRow;
