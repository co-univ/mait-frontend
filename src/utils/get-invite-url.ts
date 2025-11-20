/**
 *
 */
export const getInviteUrl = (code: string) => {
	return `${window.location.origin}/invite?code=${code}`;
};
