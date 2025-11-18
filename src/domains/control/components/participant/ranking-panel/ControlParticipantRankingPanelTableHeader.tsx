import CheckBox from "@/components/CheckBox";
import { Table } from "@/components/table";

//
//
//

const ControlParticipantRankingPanelTableHeader = () => {
	return (
		<Table.Header>
			<Table.HeaderCell width="32px" className="flex items-center">
				<CheckBox checked={false} size={20} onChange={() => {}} />
			</Table.HeaderCell>
			<Table.HeaderCell width="100px">등수</Table.HeaderCell>
			<Table.HeaderCell grow>이름</Table.HeaderCell>
		</Table.Header>
	);
};

export default ControlParticipantRankingPanelTableHeader;
