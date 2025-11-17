import { ChevronDown, ChevronUp } from "lucide-react";

//
//
//

interface ControlSolvingQuestionAnswerExpandButtonProps {
	isExpanded: boolean;
	onClick: () => void;
}

//
//
//

const ControlSolvingQuestionAnswerExpandButton = ({
	isExpanded,
	onClick,
}: ControlSolvingQuestionAnswerExpandButtonProps) => {
	return (
		<button type="button" onClick={onClick}>
			{isExpanded ? <ChevronUp /> : <ChevronDown />}
		</button>
	);
};

export default ControlSolvingQuestionAnswerExpandButton;
