import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { ParticipantInfoApiResponse } from "@/libs/types";

//
//
//

interface ControlParticipantMemberBoxProps {
	member: ParticipantInfoApiResponse;
	onMemeberDelete: (participantId: number) => void;
}

//
//
//

const ControlParticipantMemberBox = ({
	member,
	onMemeberDelete,
}: ControlParticipantMemberBoxProps) => {
	return (
		<div className="flex justify-between p-padding-8 rounded-radius-medium1 border border-color-gray-10">
			<span className="truncate typo-heading-small">
				{member.participantName}({member.userNickname})
			</span>
			<DeleteCheckBox onClick={() => onMemeberDelete(member.participantId)} />
		</div>
	);
};

export default ControlParticipantMemberBox;
