import type React from "react";

//
//
//

interface InviteTeamNameProps {
	children: React.ReactNode;
}

//
//
//

const InviteTeamName = ({ children }: InviteTeamNameProps) => {
	return (
		<b className="typo-body-large-bold text-color-primary-50">{children}</b>
	);
};

export default InviteTeamName;
