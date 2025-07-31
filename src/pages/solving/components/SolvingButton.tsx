import type { SolvingBadegeProps } from "./SolvingBadege";
import SolvingBadege from "./SolvingBadege";

//
//
//

interface SolvingButtonProps extends SolvingBadegeProps {}

//
//
//

const SolvingButton = ({
	lable,
	direction = "row-reverse",
	icon,
}: SolvingButtonProps) => {
	return (
		<SolvingBadege
			lable={lable}
			direction={direction}
			icon={icon}
			as="button"
		/>
	);
};

export default SolvingButton;
