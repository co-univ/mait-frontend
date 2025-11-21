import type { ParticipantInfoApiResponse } from "@/libs/types";

/**
 *
 * @param nameWithNickname
 * @param participants
 * @returns
 */
export const findParticipantByNameWithNickname = (
	nameWithNickname: string,
	participants: ParticipantInfoApiResponse[],
): ParticipantInfoApiResponse | undefined => {
	return participants.find((participant) => {
		return (
			`${participant.participantName}(${participant.userNickname})` ===
			nameWithNickname
		);
	});
};
