export const PARTICIPANT_STATUS = {
  ACTIVE: 'ACTIVE',
  ELUMINATED: 'ELUMINATED'
} as const;

export type ParticipantStatus = typeof PARTICIPANT_STATUS[keyof typeof PARTICIPANT_STATUS];