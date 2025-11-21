import type React from "react";
import Button from "@/components/Button";

//
//
//

interface InviteButtonProps {
	item: React.ReactNode;
	onClick: () => void;
}

//
//
//

const InviteButton = ({ item, onClick }: InviteButtonProps) => {
	return (
		<Button
			item={item}
			onClick={onClick}
			className="py-padding-6 px-padding-12 border-none bg-color-primary-50 text-color-alpha-white100 typo-heading-xsmall"
		/>
	);
};

export default InviteButton;
