import type { SolvingBadegeProps } from "./SolvingBadege";
import SolvingBadege from "./SolvingBadege";

//
//
//

interface SolvingButtonProps extends SolvingBadegeProps {
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
		<SolvingBadege
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
