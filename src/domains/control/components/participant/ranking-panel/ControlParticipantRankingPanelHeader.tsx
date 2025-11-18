import type React from "react";

//
//
//

interface ControlParticipantRankingPanelHeaderProps {
	icon: React.ReactNode;
	title: string;
}

//
//
//

const ControlParticipantRankingPanelHeader = ({
	icon,
	title,
}: ControlParticipantRankingPanelHeaderProps) => {
	return (
		<div className="flex items-center gap-gap-5 typo-heading-medium">
			<span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span>
			<h2>{title}</h2>
		</div>
	);
};

export default ControlParticipantRankingPanelHeader;
