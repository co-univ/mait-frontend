import type React from "react";

//
//
//

interface TeamManagementUsersPanelProps {
	icon: React.ReactNode;
	title: string;
	children: React.ReactNode;
}

//
//
//

const TeamManagementUsersPanel = ({
	icon,
	title,
	children,
}: TeamManagementUsersPanelProps) => {
	return (
		<div className="flex flex-col gap-gap-9 p-padding-11 rounded-radius-large2 border border-color-gray-10">
			<div className="flex gap-gap-5 items-center">
				{icon}
				<h2 className="typo-heading-medium">{title}</h2>
			</div>
			{children}
		</div>
	);
};

export default TeamManagementUsersPanel;
