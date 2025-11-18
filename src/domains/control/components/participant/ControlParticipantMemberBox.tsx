import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { ParticipantInfoResponse } from "@/libs/types";

//
//
//

interface ControlParticipantMemberBoxProps {
	member: ParticipantInfoResponse;
}

//
//
//

const ControlParticipantMemberBox = ({
	member,
}: ControlParticipantMemberBoxProps) => {
	return (
		<div className="flex justify-between p-padding-8 rounded-radius-medium1 border border-color-gray-10">
			<span className="typo-heading-small">{member.participantName}</span>
			<DeleteCheckBox />
		</div>
	);
};

export default ControlParticipantMemberBox;
