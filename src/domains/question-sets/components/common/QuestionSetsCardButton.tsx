import type { ButtonProps } from "@/components/Button";
import Button from "@/components/Button";

//
//
//

interface QuestionSetsCardButtonProps extends ButtonProps {}

//
//
//

const QuestionSetsCardButton = ({ ...props }: QuestionSetsCardButtonProps) => {
	return (
		<Button
			{...props}
			className="py-padding-4 px-padding-8 !bg-color-alpha-white100 border border-color-gray-10 typo-body-xsmall hover:!bg-color-primary-50 hover:text-color-alpha-white100 hover:border-0"
		/>
	);
};

export default QuestionSetsCardButton;
