import { Plus } from "lucide-react";
import Button from "@/components/Button";

//
//
//

interface ControlSolvingQuestionAnswerAddButtonProps {
	onClick?: () => void;
}

//
//
//

const ControlSolvingQuestionAnswerAddButton = ({
	onClick,
}: ControlSolvingQuestionAnswerAddButtonProps) => {
	return (
		<Button
			icon={<Plus />}
			onClick={onClick}
			className="py-padding-3 px-padding-6 bg-color-gray-10"
		/>
	);
};

export default ControlSolvingQuestionAnswerAddButton;
