import clsx from "clsx";
import { useState } from "react";
import AdjustableTextarea from "@/components/AdjustableTextarea";
import type { ShortAnswerApiResponse } from "@/libs/types";
import ControlSolvingQuestionAnswerExpandButton from "./ControlSolvingQuestionAnswerExpandButton";

//
//
//

interface ControlSolvingQuestionShortAnswerProps {
	readOnly: boolean;
	answers: ShortAnswerApiResponse[];
}

//
//
//

const ControlSolvingQuestionShortAnswer = ({
	readOnly,
	answers,
}: ControlSolvingQuestionShortAnswerProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const mainAnswer = answers.find((answer) => answer.isMain);
	const subAnswers = answers.filter((answer) => !answer.isMain);

	/**
	 *
	 */
	const handleExpandButtonClick = () => {
		setIsExpanded((prev) => !prev);
	};

	/**
	 *
	 */
	const renderReadOnlyAnswer = () => {
		if (!readOnly) {
			return null;
		}

		return (
			<div className="flex-1 min-w-0 flex flex-col gap-gap-9">
				<p
					className={clsx({
						truncate: !isExpanded,
					})}
				>
					{mainAnswer?.answer}
				</p>
				{isExpanded &&
					subAnswers.map((answer) => (
						<span
							key={answer.id}
							className="w-full p-padding-6 bg-color-gray-10 rounded-radius-medium1"
						>
							{answer.answer}
						</span>
					))}
			</div>
		);
	};

	/**
	 *
	 */
	const renderEditableAnswer = () => {
		if (readOnly) {
			return null;
		}

		return <div>gd</div>;
	};

	return (
		<div className="w-full flex justify-between items-start gap-gap-9 px-padding-12 py-padding-9 bg-color-gray-5 rounded-radius-medium1 typo-body-medium">
			{readOnly ? renderReadOnlyAnswer() : renderEditableAnswer()}

			{readOnly ? (
				<ControlSolvingQuestionAnswerExpandButton
					isExpanded={isExpanded}
					onClick={handleExpandButtonClick}
				/>
			) : null}
		</div>
	);
};

export default ControlSolvingQuestionShortAnswer;
