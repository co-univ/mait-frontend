import React from "react";

//
//
//

interface MyPageButtonProps {
	label: string;
	onClick: () => void;
	variant?: "default" | "primary" | "cancel";
}

//
//
//

const MyPageButton = ({
	label,
	onClick,
	variant = "default",
}: MyPageButtonProps) => {
	const getButtonStyles = () => {
		switch (variant) {
			case "primary":
				return "bg-primary-50 text-white";
			case "cancel":
				return "bg-[#F4F5F6] text-black border-gray-10 border-[1px]";
			default:
				return "bg-color-primary-10 text-primary-50";
		}
	};

	return (
		<div className="h-[84px] flex items-end">
			<button
				type="button"
				onClick={onClick}
				className={`w-fit min-w-[132px] h-[50px] flex items-center justify-center p-gap-6 rounded-radius-medium1 typo-body-medium ${getButtonStyles()}`}
			>
				{label}
			</button>
		</div>
	);
};

export default MyPageButton;
