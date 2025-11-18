import type { ParticipantInfoResponse } from "@/libs/types";
import ControlParticipantMemberAddButton from "../../components/participant/ControlParticipantMemberAddButton";
import ControlParticipantMemberBox from "../../components/participant/ControlParticipantMemberBox";
import ControlParticipantMemberInput from "../../components/participant/ControlParticipantMemberInput";

//
//
//

const ControlParticipantNextMembers = () => {
	const mock: ParticipantInfoResponse[] = [
		{
			userId: 1,
			participantId: 1,
			participantName: "이하은",
		},
		{
			userId: 2,
			participantId: 2,
			participantName: "전민재",
		},
		{
			userId: 3,
			participantId: 3,
			participantName: "오지연",
		},
		{
			userId: 4,
			participantId: 4,
			participantName: "손민재",
		},
		{
			userId: 5,
			participantId: 5,
			participantName: "신유승",
		},
		{
			userId: 6,
			participantId: 6,
			participantName: "남기훈",
		},
		{
			userId: 7,
			participantId: 7,
			participantName: "조원영",
		},
	];

	return (
		<div className="grid gap-gap-9 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
			{mock.map((member) => (
				<ControlParticipantMemberBox
					key={member.participantId}
					member={member}
				/>
			))}
			<ControlParticipantMemberInput />
			<ControlParticipantMemberAddButton />
		</div>
	);
};

export default ControlParticipantNextMembers;
