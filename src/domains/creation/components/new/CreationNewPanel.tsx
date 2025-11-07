import type React from "react";

//
//
//

interface CreationNewPanelProps {
	children: React.ReactNode;
}

//
//
//

const CreationNewPanel = ({ children }: CreationNewPanelProps) => {
	return (
		<div className="flex flex-col gap-gap-11 flex-1 border border-color-gray-10 rounded-radius-medium1 p-padding-12">
			{children}
		</div>
	);
};

export default CreationNewPanel;
