import { Link } from "react-router-dom";

//
//
//

interface InviteLinkProps {
	link: string;
	label: string;
}

//
//
//

const InviteLink = ({ link, label }: InviteLinkProps) => {
	return (
		<Link
			to={link}
			className="typo-heading-small text-color-primary-50 underline"
		>
			{label}
		</Link>
	);
};

export default InviteLink;
