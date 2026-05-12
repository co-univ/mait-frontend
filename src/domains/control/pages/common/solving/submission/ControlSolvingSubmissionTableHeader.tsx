import { Circle } from "lucide-react";
import { Table } from "@/components/table";

//
//
//

const ControlSolvingSubmissionTableHeader = () => {
	return (
		<Table.Header>
			<Table.HeaderCell>
				<Circle size={16} className="px-padding-1 drop-shadow-md" />
			</Table.HeaderCell>
			<Table.HeaderCell width="100px">이름</Table.HeaderCell>
			<Table.HeaderCell grow>선택 답안</Table.HeaderCell>
			<Table.HeaderCell width="158px">닉네임</Table.HeaderCell>
		</Table.Header>
	);
};

export default ControlSolvingSubmissionTableHeader;
