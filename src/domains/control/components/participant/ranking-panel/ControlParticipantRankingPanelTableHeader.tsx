import CheckBox from "@/components/CheckBox";
import { Table } from "@/components/table";

//
//
//

interface ControlParticipantRankingPanelTableHeaderProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

//
//
//

const ControlParticipantRankingPanelTableHeader = ({
	checked,
	onChange,
}: ControlParticipantRankingPanelTableHeaderProps) => {
	return (
		<Table.Header>
			<Table.HeaderCell width="32px" className="flex items-center">
				<CheckBox checked={checked} size={20} onChange={onChange} />
			</Table.HeaderCell>
			<Table.HeaderCell width="100px">등수</Table.HeaderCell>
			<Table.HeaderCell grow>이름</Table.HeaderCell>
		</Table.Header>
	);
};

export default ControlParticipantRankingPanelTableHeader;
