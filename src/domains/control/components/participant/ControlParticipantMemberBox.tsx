import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { ParticipantInfoApiResponse } from "@/libs/types";

//
//
//

interface ControlParticipantMemberBoxProps {
	member: ParticipantInfoApiResponse;
}

//
//
//

const ControlParticipantMemberBox = ({
	member,
}: ControlParticipantMemberBoxProps) => {
	return (
		<div className="flex justify-between p-padding-8 rounded-radius-medium1 border border-color-gray-10">
			<span className="typo-heading-small">
				{member.participantName}({member.userNickname})
			</span>
			<DeleteCheckBox />
		</div>
	);
};

export default ControlParticipantMemberBox;
