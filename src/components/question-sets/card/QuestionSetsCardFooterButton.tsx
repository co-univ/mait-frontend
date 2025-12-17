import { clsx } from "clsx";
import type { ButtonProps } from "@/components/Button";
import Button from "@/components/Button";

//
//
//

interface QuestionSetsCardFooterButtonProps extends ButtonProps {}

//
//
//

const QuestionSetsCardFooterButton = ({
	...props
}: QuestionSetsCardFooterButtonProps) => {
	return (
		<Button
			{...props}
			className={clsx(
				"py-padding-4 px-padding-8 bg-color-alpha-white100 border border-color-gray-10 typo-body-xsmall",
				props.className,
			)}
		/>
	);
};

export default QuestionSetsCardFooterButton;
