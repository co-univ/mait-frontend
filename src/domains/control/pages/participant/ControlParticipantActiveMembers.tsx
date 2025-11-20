import { useState } from "react";
import { useParams } from "react-router-dom";
import ControlParticipantMemberAddButton from "../../components/participant/ControlParticipantMemberAddButton";
import ControlParticipantMemberBox from "../../components/participant/ControlParticipantMemberBox";
import ControlParticipantMemberInput from "../../components/participant/ControlParticipantMemberInput";
import useControlParticipants from "../../hooks/paticipant/useControlParticipants";

//
//
//

const ControlParticipantActiveMembers = () => {
	const [isAddingParticipant, setIsAddingParticipant] = useState(false);

	const questionSetId = Number(useParams().questionSetId);

	const { activeParticipants } = useControlParticipants({
		questionSetId,
	});

	return (
		<div className="grid gap-gap-9 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
			{activeParticipants?.map((member) => (
				<ControlParticipantMemberBox
					key={member.participantId}
					member={member}
				/>
			))}
			{isAddingParticipant && <ControlParticipantMemberInput />}
			<ControlParticipantMemberAddButton
				onClick={() => setIsAddingParticipant(true)}
			/>
		</div>
	);
};

export default ControlParticipantActiveMembers;
