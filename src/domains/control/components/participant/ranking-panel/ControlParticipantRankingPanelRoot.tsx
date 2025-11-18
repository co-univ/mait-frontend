import type React from "react";

//
//
//

interface ControlParticipantRankingPanelRootProps {
	children: React.ReactNode;
}

//
//
//

const ControlParticipantRankingPanelRoot = ({
	children,
}: ControlParticipantRankingPanelRootProps) => {
	return (
		<div className="flex flex-col gap-gap-9 p-padding-11 border border-color-gray-10 rounded-radius-large2">
			{children}
		</div>
	);
};

export default ControlParticipantRankingPanelRoot;
