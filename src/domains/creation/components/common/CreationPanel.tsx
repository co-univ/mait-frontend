import type React from "react";

//
//
//

interface CreationPanelProps {
	children: React.ReactNode;
}

//
//
//

const CreationPanel = ({ children }: CreationPanelProps) => {
	return (
		<div className="flex flex-col gap-gap-11 flex-1 border border-color-gray-10 rounded-radius-medium1 p-padding-12">
			{children}
		</div>
	);
};

export default CreationPanel;
