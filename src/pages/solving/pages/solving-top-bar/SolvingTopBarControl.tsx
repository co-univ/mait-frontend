import type React from "react";
import SolvingBadege from "../../components/SolvingBadege";
import SolvingButton from "../../components/SolvingButton";

//
//
//

interface SolvingTopBarControlProps {
	badgeLabel: string;
	badgeIcon: React.ReactNode;
	buttonLabel: string;
	buttonIcon: React.ReactNode;
	onSubmit: () => void;
	disabled?: boolean;
}

//
//
//

const SolvingTopBarControl = ({
	badgeLabel,
	badgeIcon,
	buttonLabel,
	buttonIcon,
	onSubmit,
	disabled,
}: SolvingTopBarControlProps) => {
	return (
		<div className="flex justify-between w-full">
			<SolvingBadege lable={badgeLabel} icon={badgeIcon} />
			<SolvingButton
				lable={buttonLabel}
				icon={buttonIcon}
				onClick={onSubmit}
				disabled={disabled}
			/>
		</div>
	);
};

export default SolvingTopBarControl;
