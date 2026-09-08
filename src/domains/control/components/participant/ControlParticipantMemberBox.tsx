import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { ParticipantInfoApiResponse } from "@/libs/types";

//
//
//

interface ControlParticipantMemberBoxProps {
	member: ParticipantInfoApiResponse;
	onMemeberDelete: (participantId: number) => void;
	isDeletable?: boolean;
}

//
//
//

const ControlParticipantMemberBox = ({
	member,
	onMemeberDelete,
	isDeletable = true,
}: ControlParticipantMemberBoxProps) => {
	return (
		<div className="flex justify-between p-padding-8 rounded-radius-medium1 border border-color-gray-10">
			<span className="truncate typo-heading-small">
				{member.participantName}({member.userNickname})
			</span>
			<DeleteCheckBox
				disabled={!isDeletable}
				onClick={() => onMemeberDelete(member.participantId)}
			/>
		</div>
	);
};

export default ControlParticipantMemberBox;
