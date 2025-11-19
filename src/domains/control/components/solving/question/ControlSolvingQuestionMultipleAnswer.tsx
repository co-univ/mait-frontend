import clsx from "clsx";
import { useState } from "react";
import CheckBox from "@/components/CheckBox";
import ControlSolvingQuestionAnswerExpandButton from "./ControlSolvingQuestionAnswerExpandButton";

//
//
//

interface ControlSolvingQuestionMultipleAnswerProps {
	readOnly: boolean;
	isCorrect: boolean;
	content?: string;
	onChange: (checked: boolean) => void;
}

//
//
//

const ControlSolvingQuestionMultipleAnswer = ({
	readOnly,
	isCorrect,
	content,
	onChange,
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
				"w-full flex items-start justify-between gap-gap-5 px-padding-11 py-padding-9 bg-color-gray-5 rounded-radius-medium1 typo-body-medium",
				{
					"border border-color-primary-50 bg-color-primary-5 typo-body-medium-bold text-color-primary-50":
						isCorrect,
				},
			)}
		>
			{!readOnly && <CheckBox checked={isCorrect} onChange={onChange} />}
			<p
				className={clsx("flex-1", {
					truncate: readOnly && !isExpanded,
				})}
			>
				{content}
			</p>
			{readOnly && (
				<ControlSolvingQuestionAnswerExpandButton
					isExpanded={isExpanded}
					onClick={handleExpandButtonClick}
				/>
			)}
		</div>
	);
};

export default ControlSolvingQuestionMultipleAnswer;
