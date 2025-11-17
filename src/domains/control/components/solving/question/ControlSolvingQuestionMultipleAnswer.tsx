import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import CheckBox from "@/components/CheckBox";

//
//
//

interface ControlSolvingQuestionMultipleAnswerProps {
	readOnly: boolean;
	isCorrect: boolean;
	content?: string;
}

//
//
//

const ControlSolvingQuestionMultipleAnswer = ({
	readOnly,
	isCorrect,
	content,
}: ControlSolvingQuestionMultipleAnswerProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	/**
	 *
	 */
	const handleExpandButtonClick = () => {
		setIsExpanded((prev) => !prev);
	};

	return (
		<div
			className={clsx(
				"flex items-start gap-gap-9 px-padding-12 py-padding-9 bg-color-gray-5 rounded-radius-medium1 overflow-hidden typo-body-medium",
				{
					"border border-color-primary-50 bg-color-primary-5 typo-body-medium-bold text-color-primary-50":
						isCorrect,
				},
			)}
		>
			{!readOnly && <CheckBox checked={isCorrect} onChange={() => {}} />}
			<p
				className={clsx({
					truncate: readOnly && !isExpanded,
				})}
			>
				{content}
			</p>
			{readOnly && (
				<button type="button" onClick={handleExpandButtonClick}>
					{isExpanded ? <ChevronUp /> : <ChevronDown />}
				</button>
			)}
		</div>
	);
};

export default ControlSolvingQuestionMultipleAnswer;
