import { create } from "zustand";
import type { ParticipantInfoApiResponse } from "@/libs/types";

//
//
//

interface ControlParticipantStoreState {
	activeParticipants?: ParticipantInfoApiResponse[];
	eliminatedParticipants?: ParticipantInfoApiResponse[];
	isEditing: boolean;
}

interface ControlParticipantStoreActions {
	initParticipants: (
		activeParticipants?: ParticipantInfoApiResponse[],
		eliminatedParticipants?: ParticipantInfoApiResponse[],
	) => void;
	setActiveParticipants: (participants: ParticipantInfoApiResponse[]) => void;
	setEliminatedParticipants: (
		participants: ParticipantInfoApiResponse[],
	) => void;
}

//
//
//

const useControlParticipantStore = create<
	ControlParticipantStoreState & ControlParticipantStoreActions
>()((set) => ({
	activeParticipants: undefined,
	eliminatedParticipants: undefined,
	isEditing: false,

	initParticipants: (
		activeParticipants?: ParticipantInfoApiResponse[],
		eliminatedParticipants?: ParticipantInfoApiResponse[],
	) => {
		set({ activeParticipants, eliminatedParticipants, isEditing: false });
	},

	setActiveParticipants: (participants: ParticipantInfoApiResponse[]) =>
		set({ activeParticipants: participants, isEditing: true }),

	setEliminatedParticipants: (participants: ParticipantInfoApiResponse[]) =>
		set({ eliminatedParticipants: participants, isEditing: true }),
}));

export default useControlParticipantStore;
