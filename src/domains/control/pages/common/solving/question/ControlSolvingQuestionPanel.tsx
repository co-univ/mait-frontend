import clsx from "clsx";
import { Check, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import ControlSolvingQuestionContent from "@/domains/control/components/solving/question/ControlSolvingQuestionContent";
import useControlSolvingQuestion from "@/domains/control/hooks/solving/question/useControlSolvingQuestion";
import type { QuestionType } from "@/libs/types";
import ControlSolvingQuestionFillBlank from "./ControlSolvingQuestionFillBlank";
import ControlSolvingQuestionMultiple from "./ControlSolvingQuestionMultiple";
import ControlSolvingQuestionOrdering from "./ControlSolvingQuestionOrdering";
import ControlSolvingQuestionShort from "./ControlSolvingQuestionShort";

//
//
//

interface ControlSolvingQuestionPanelProps {
	topControls?: ReactNode;
}

//
//
//

const ControlSolvingQuestionPanel = ({
	topControls,
}: ControlSolvingQuestionPanelProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isMouseOverOnEditButton, setIsMouseOverOnEditButton] = useState(false);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		hasSubmitAnswerPayload,
		question,
		refetchQuestion,
		submitAnswer,
	} = useControlSolvingQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const handleEditButtonClick = () => {
		setIsEditing(true);
	};

	/**
	 *
	 */
	const handleCancelButtonClick = () => {
		setIsEditing(false);
		refetchQuestion();
	};

	/**
	 *
	 */
	const handleCompleteButtonClick = async () => {
		const res = await submitAnswer();

		if (res) {
			setIsEditing(false);
		}
	};

	/**
	 *
	 */
	const renderCancelButton = () => {
		if (!isEditing) {
			return null;
		}

		return (
			<Button
				icon={<X />}
				onClick={handleCancelButtonClick}
				className="border-none"
			/>
		);
	};

	/**
	 *
	 */
	const renderEditButton = () => {
		if (isEditing) {
			return (
				<Button
					disabled={!hasSubmitAnswerPayload}
					icon={<Check />}
					item="수정 완료"
					onClick={handleCompleteButtonClick}
					className={clsx({
						"border-transparent bg-color-gray-5 text-color-gray-30":
							!hasSubmitAnswerPayload,
					})}
				/>
			);
		}

		const isQuestionEditable = ["SHORT", "FILL_BLANK"].includes(
			question?.type as QuestionType,
		);

		return (
			<Tooltip
				open={!isQuestionEditable && isMouseOverOnEditButton}
				message="객관식과 순서 유형은 답안 수정이 불가합니다."
			>
				<Button
					disabled={!isQuestionEditable}
					icon={<Pencil />}
					onClick={handleEditButtonClick}
					onMouseOver={() => setIsMouseOverOnEditButton(true)}
					onMouseOut={() => setIsMouseOverOnEditButton(false)}
					className={clsx({
						"bg-color-gray-5 border-none text-color-gray-20":
							!isQuestionEditable,
					})}
				/>
			</Tooltip>
		);
	};

	/**
	 *
	 */
	const renderQuestionAnswer = () => {
		switch (question?.type as QuestionType) {
			case "MULTIPLE":
				return <ControlSolvingQuestionMultiple />;
			case "SHORT":
				return <ControlSolvingQuestionShort isEditing={isEditing} />;
			case "ORDERING":
				return <ControlSolvingQuestionOrdering />;
			case "FILL_BLANK":
				return <ControlSolvingQuestionFillBlank isEditing={isEditing} />;
			default:
				return null;
		}
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: Reset edit mode on questionId change
	useEffect(() => {
		setIsEditing(false);
	}, [questionId]);

	return (
		<div className="flex flex-col gap-gap-11 min-w-0">
			<div className="flex justify-between">
				{isEditing ? renderCancelButton() : (topControls ?? <div />)}
				{renderEditButton()}
			</div>

			<ControlSolvingQuestionContent
				content={question?.content}
				imgUrl={question?.imageUrl}
			/>
			{renderQuestionAnswer()}
		</div>
	);
};

export default ControlSolvingQuestionPanel;
