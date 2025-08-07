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
}: SolvingButtonProps) => {
	return (
		<SolvingBadege
			lable={lable}
			direction={direction}
			icon={icon}
			as="button"
			onClick={onClick}
			disabled={disabled}
		/>
	);
};

export default SolvingButton;
