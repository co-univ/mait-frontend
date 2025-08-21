import type { SolvingBadgeProps } from "src/pages/solving/components/common/SolvingBadge";
import SolvingBadge from "src/pages/solving/components/common/SolvingBadge";

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
