import AdjustableTextarea from "@/components/AdjustableTextarea";
import CheckBox from "@/components/CheckBox";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { MultipleChoiceDto } from "@/libs/types";

//
//
//

interface CreationQuestionAnswerMultipleBoxProps {
	choice: MultipleChoiceDto;
	onCorrectChange: (isCorrect: boolean) => void;
	onContentChange: (content: string) => void;
	onChoiceDelete: () => void;
}

//
//
//

const CreationQuestionAnswerMultipleBox = ({
	choice,
	onContentChange,
	onCorrectChange,
	onChoiceDelete,
}: CreationQuestionAnswerMultipleBoxProps) => {
	return (
		<div className="w-full flex items-center gap-gap-9 px-padding-12 py-padding-9 rounded-medium1 bg-color-gray-5">
			<CheckBox checked={choice?.isCorrect} onChange={onCorrectChange} />

			<AdjustableTextarea
				value={choice?.content}
				placeholder={`객관식 ${choice?.number}번 선지`}
				onChange={(e) => onContentChange(e.target.value)}
				className="w-full typo-body-large"
			/>

			<DeleteCheckBox onClick={onChoiceDelete} />
		</div>
	);
};

export default CreationQuestionAnswerMultipleBox;
