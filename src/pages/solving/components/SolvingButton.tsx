import type { SolvingBadegeProps } from "@/pages/solving/components/SolvingBadege";
import SolvingBadege from "@/pages/solving/components/SolvingBadege";

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
