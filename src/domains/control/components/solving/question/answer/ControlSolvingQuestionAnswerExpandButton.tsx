import { ChevronDown, ChevronUp } from "lucide-react";

//
//
//

interface ControlSolvingQuestionAnswerExpandButtonProps {
	expanded: boolean;
	hide?: boolean;
	onClick: () => void;
}

//
//
//

const ControlSolvingQuestionAnswerExpandButton = ({
	expanded,
	hide = false,
	onClick,
}: ControlSolvingQuestionAnswerExpandButtonProps) => {
	if (hide) {
		return null;
	}

	return (
		<button type="button" onClick={onClick}>
			{expanded ? <ChevronUp /> : <ChevronDown />}
		</button>
	);
};

export default ControlSolvingQuestionAnswerExpandButton;
