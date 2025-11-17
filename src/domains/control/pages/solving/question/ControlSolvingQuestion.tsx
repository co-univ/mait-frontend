import { Pencil } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { Switch } from "@/components/switch/Switch";
import ControlSolvingQuestionContent from "@/domains/control/components/solving/question/ControlSolvingQuestionContent";
import useControlSolvingQuestion from "@/domains/control/hooks/solving/question/useControlSolvingQuestion";
import type { QuestionType } from "@/libs/types";
import ControlSolvingQuestionMultiple from "./ControlSolvingQuestionMultiple";
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
		setIsEditing((prev) => !prev);
	};

	/**
	 *
	 */
	const renderQuestionControlButtons = () => {
		return (
			<div className="flex gap-gap-9">
				<Switch.Root checked>
					<Switch.Label>문제 공개</Switch.Label>
					<Switch.Toggle />
				</Switch.Root>
				<Switch.Root checked>
					<Switch.Label>제출 허용</Switch.Label>
					<Switch.Toggle />
				</Switch.Root>
			</div>
		);
	};

	/**
	 *
	 */
	const renderEditButton = () => {
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
				return <ControlSolvingQuestionShort readonly={!isEditing} />;
			default:
				return "얍";
		}
	};

	return (
		<div className="flex flex-col gap-gap-11 min-w-0">
			<div className="flex justify-between">
				{renderQuestionControlButtons()}
				{renderEditButton()}
			</div>
			{renderQuestionContent()}
			{renderQuestionAnswer()}
		</div>
	);
};

export default ControlSolvingQuestion;
