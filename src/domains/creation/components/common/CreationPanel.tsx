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
	return <div className="flex flex-col gap-gap-11">{children}</div>;
};

export default CreationPanel;
