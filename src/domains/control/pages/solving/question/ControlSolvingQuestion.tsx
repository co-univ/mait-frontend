import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { Switch } from "@/components/switch/Switch";
import ControlSolvingQuestionContent from "@/domains/control/components/solving/question/ControlSolvingQuestionContent";
import useControlSolvingQuestion from "@/domains/control/hooks/solving/question/useControlSolvingQuestion";
import type { QuestionApiResponse, QuestionType } from "@/libs/types";
import ControlSolvingQuestionFillBlank from "./ControlSolvingQuestionFillBlank";
import ControlSolvingQuestionMultiple from "./ControlSolvingQuestionMultiple";
import ControlSolvingQuestionOrdering from "./ControlSolvingQuestionOrdering";
import ControlSolvingQuestionShort from "./ControlSolvingQuestionShort";

//
//
//

const ControlSolvingQuestion = () => {
	const [isEditing, setIsEditing] = useState(false);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { question } = useControlSolvingQuestion({
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
	};

	/**
	 *
	 */
	const renderQuestionControlButtons = () => {
		const allowedAccessTypes: QuestionApiResponse["questionStatusType"][] = [
			"ACCESS_PERMISSION",
			"SOLVE_PERMISSION",
		];
		const allowedSolveType: QuestionApiResponse["questionStatusType"][] = [
			"SOLVE_PERMISSION",
		];

		return (
			<div className="flex gap-gap-9">
				<Switch.Root
					checked={allowedAccessTypes.includes(question?.questionStatusType)}
				>
					<Switch.Label>문제 공개</Switch.Label>
					<Switch.Toggle />
				</Switch.Root>
				<Switch.Root
					checked={allowedSolveType.includes(question?.questionStatusType)}
				>
					<Switch.Label>제출 허용</Switch.Label>
					<Switch.Toggle />
				</Switch.Root>
			</div>
		);
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
			return <Button icon={<Check />} item="수정 완료" />;
		}

		return <Button icon={<Pencil />} onClick={handleEditButtonClick} />;
	};

	/**
	 *
	 */
	const renderQuestionContent = () => {
		return (
			<ControlSolvingQuestionContent
				content={question?.content}
				imgUrl={question?.imageUrl}
			/>
		);
	};

	/**
	 *
	 */
	const renderQuestionAnswer = () => {
		switch (question?.type as QuestionType) {
			case "MULTIPLE":
				return <ControlSolvingQuestionMultiple readOnly={!isEditing} />;
			case "SHORT":
				return <ControlSolvingQuestionShort readOnly={!isEditing} />;
			case "ORDERING":
				return <ControlSolvingQuestionOrdering readOnly={!isEditing} />;
			case "FILL_BLANK":
				return <ControlSolvingQuestionFillBlank readOnly={!isEditing} />;
			default:
				return null;
		}
	};

	return (
		<div className="flex flex-col gap-gap-11 min-w-0">
			<div className="flex justify-between">
				{isEditing ? renderCancelButton() : renderQuestionControlButtons()}
				{renderEditButton()}
			</div>
			{renderQuestionContent()}
			{renderQuestionAnswer()}
		</div>
	);
};

export default ControlSolvingQuestion;
