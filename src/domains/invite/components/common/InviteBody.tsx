import type React from "react";

//
//
//

interface InviteBodyProps {
	children?: React.ReactNode;
}

//
//
//

const InviteBody = ({ children }: InviteBodyProps) => {
	return <h2 className="text-center typo-body-large">{children}</h2>;
};

export default InviteBody;
