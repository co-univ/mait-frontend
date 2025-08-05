import type React from "react";
import SolvingBadege from "@/pages/solving/components/SolvingBadege";
import SolvingButton from "@/pages/solving/components/SolvingButton";

//
//
//

interface SolvingTopBarControlProps {
	badgeLabel: string;
	badgeIcon: React.ReactNode;
	buttonLabel: string;
	buttonIcon: React.ReactNode;
}

//
//
//

const SolvingTopBarControl = ({
	badgeLabel,
	badgeIcon,
	buttonLabel,
	buttonIcon,
}: SolvingTopBarControlProps) => {
	return (
		<div className="flex justify-between w-full">
			<SolvingBadege lable={badgeLabel} icon={badgeIcon} />
			<SolvingButton lable={buttonLabel} icon={buttonIcon} />
		</div>
	);
};

export default SolvingTopBarControl;
