import clsx from "clsx";
import { useState } from "react";
import type { OrderingOptionApiResponse } from "@/libs/types";
import ControlSolvingQuestionAnswerExpandButton from "./ControlSolvingQuestionAnswerExpandButton";

//
//
//

interface ControlSolvingQuestionOrderingAnswerProps {
	readOnly: boolean;
	option: OrderingOptionApiResponse;
}

//
//
//

const ControlSolvingQuestionOrderingAnswer = ({
	readOnly,
	option,
}: ControlSolvingQuestionOrderingAnswerProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	/**
	 *
	 */
	const handleExpandButtonClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="flex items-center gap-gap-9">
			<span className="typo-heading-xsmall">
				{String.fromCharCode(64 + option.originOrder)}
			</span>

			<div className="w-full min-w-0 flex items-start justify-between gap-gap-9 px-padding-12 py-padding-9 bg-color-gray-5 rounded-radius-medium1 typo-body-medium">
				<p
					className={clsx({
						truncate: readOnly && !isExpanded,
					})}
				>
					{option.content}
				</p>
				{readOnly && (
					<ControlSolvingQuestionAnswerExpandButton
						isExpanded={isExpanded}
						onClick={handleExpandButtonClick}
					/>
				)}
			</div>
		</div>
	);
};

export default ControlSolvingQuestionOrderingAnswer;
