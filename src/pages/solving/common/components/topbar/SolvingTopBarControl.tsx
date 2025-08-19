import type React from "react";
import SolvingBadge from "src/pages/solving/common/components/SolvingBadge";
import useSolvingCorrectStore from "src/stores/useSolvingCorrectStore";
import SolvingButton from "../SolvingButton";

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
	const { isSubmitted, isCorrected } = useSolvingCorrectStore();

	/**
	 *
	 */
	const getColor = () => {
		if (!isSubmitted) {
			return "primary";
		}

		if (isCorrected) {
			return "success";
		}

		return "point";
	};

	return (
		<div className="flex justify-between w-full">
			<SolvingBadge lable={badgeLabel} icon={badgeIcon} color={getColor()} />
			<SolvingButton
				lable={buttonLabel}
				icon={buttonIcon}
				onClick={onSubmit}
				disabled={disabled}
				color={getColor()}
			/>
		</div>
	);
};

export default SolvingTopBarControl;
