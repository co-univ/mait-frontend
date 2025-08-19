import type { SolvingBadgeProps } from "src/pages/solving/common/components/SolvingBadge";
import SolvingBadge from "src/pages/solving/common/components/SolvingBadge";

//
//
//

interface SolvingButtonProps extends SolvingBadgeProps {
	onClick?: () => void;
}

//
//
//

const SolvingButton = ({
	lable,
	direction = "row-reverse",
	icon,
	onClick,
	disabled,
	color,
}: SolvingButtonProps) => {
	return (
		<SolvingBadge
			lable={lable}
			direction={direction}
			icon={icon}
			as="button"
			onClick={onClick}
			disabled={disabled}
			color={color}
		/>
	);
};

export default SolvingButton;
