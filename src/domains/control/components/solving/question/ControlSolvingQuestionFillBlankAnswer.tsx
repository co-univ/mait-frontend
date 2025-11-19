import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import AdjustableTextarea from "@/components/AdjustableTextarea";
import Button from "@/components/Button";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { FillBlankAnswerApiResponse } from "@/libs/types";
import ControlSolvingQuestionAnswerExpandButton from "./ControlSolvingQuestionAnswerExpandButton";

//
//
//

interface ControlSolvingQuestionFillBlankAnswerProps {
	readOnly: boolean;
	answers: FillBlankAnswerApiResponse[];
}

//
//
//

const ControlSolvingQuestionFillBlankAnswer = ({
	readOnly,
	answers,
}: ControlSolvingQuestionFillBlankAnswerProps) => {
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
							className="w-full py-padding-3 px-padding-6 bg-color-gray-10 rounded-radius-medium1"
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

		return (
			<div className="w-full flex flex-col gap-gap-9">
				<span className="flex items-center justify-between gap-gap-9">
					<AdjustableTextarea value={mainAnswer?.answer} />
					<Button icon={<Plus />} className="bg-color-gray-10 py-padding-3" />
				</span>
				{subAnswers.map((answer) => (
					<div
						key={answer.id}
						className="flex justify-between gap-gap-9 bg-color-gray-10 rounded-radius-medium1 p-padding-6"
					>
						<AdjustableTextarea value={answer.answer} />
						<DeleteCheckBox />
					</div>
				))}
			</div>
		);
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

export default ControlSolvingQuestionFillBlankAnswer;
