export const PARTICIPANT_STATUS = {
  ACTIVE: 'ACTIVE',
  ELIMINATED: 'ELIMINATED'
} as const;

export type ParticipantStatus = typeof PARTICIPANT_STATUS[keyof typeof PARTICIPANT_STATUS];