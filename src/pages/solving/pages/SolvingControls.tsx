import type React from "react";
import SolvingBadege from "../components/SolvingBadege";
import SolvingButton from "../components/SolvingButton";

//
//
//

interface SolvingControlsProps {
	badgeLabel: string;
	badgeIcon: React.ReactNode;
	buttonLabel: string;
	buttonIcon: React.ReactNode;
}

//
//
//

const SolvingControls = ({
	badgeLabel,
	badgeIcon,
	buttonLabel,
	buttonIcon,
}: SolvingControlsProps) => {
	return (
		<div className="flex justify-between w-full">
			<SolvingBadege lable={badgeLabel} icon={badgeIcon} />
			<SolvingButton lable={buttonLabel} icon={buttonIcon} />
		</div>
	);
};

export default SolvingControls;
