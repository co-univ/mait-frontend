import { useState } from "react";
import { useParams } from "react-router-dom";
import { notify } from "@/components/Toast";
import ControlParticipantMemberAddButton from "../../components/participant/ControlParticipantMemberAddButton";
import ControlParticipantMemberBox from "../../components/participant/ControlParticipantMemberBox";
import ControlParticipantMemberInput from "../../components/participant/ControlParticipantMemberInput";
import useControlParticipants from "../../hooks/paticipant/useControlParticipants";
import { findParticipantByNameWithNickname } from "../../utils/find-participant";

//
//
//

const ControlParticipantActiveMembers = () => {
	const [isAddingParticipant, setIsAddingParticipant] = useState(false);

	const questionSetId = Number(useParams().questionSetId);

	const {
		activeParticipants,
		eliminatedParticipants,
		handleAddActiveParticipant,
		handleDeleteActiveParticipant,
	} = useControlParticipants({
		questionSetId,
	});

	/**
	 *
	 */
	const handleAddMember = (memberNameWitNickname: string) => {
		const existActiveParticipant = findParticipantByNameWithNickname(
			memberNameWitNickname,
			activeParticipants ?? [],
		);

		if (existActiveParticipant) {
			notify.warn("이미 선택된 진출자입니다.");

			return;
		}

		const addedParticipant = findParticipantByNameWithNickname(
			memberNameWitNickname,
			eliminatedParticipants ?? [],
		);

		if (addedParticipant) {
			handleAddActiveParticipant([addedParticipant]);
			setIsAddingParticipant(false);
		} else {
			notify.error("존재하지 않은 참가자입니다.");
		}
	};

	/**
	 *
	 */
	const handleDeleteMember = (participantId: number) => {
		const deletedParticipants = activeParticipants?.filter(
			(participant) => participant.participantId === participantId,
		);

		if (!deletedParticipants || deletedParticipants.length === 0) {
			notify.error("진출자 삭제에 실패했습니다.");

			return;
		}

		handleDeleteActiveParticipant(deletedParticipants);
	};

	return (
		<div className="grid gap-gap-9 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
			{activeParticipants?.map((member) => (
				<ControlParticipantMemberBox
					key={member.participantId}
					member={member}
					onMemeberDelete={handleDeleteMember}
				/>
			))}
			{isAddingParticipant && (
				<ControlParticipantMemberInput onMemberAdd={handleAddMember} />
			)}
			<ControlParticipantMemberAddButton
				onClick={() => setIsAddingParticipant(true)}
			/>
		</div>
	);
};

export default ControlParticipantActiveMembers;
