import AdjustableTextarea from "@/components/AdjustableTextarea";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import type { ShortAnswerApiResponse } from "@/libs/types";

//
//
//

interface CreationQuestionAnswerSubstituteBoxProps {
	answer: ShortAnswerApiResponse;
	onAnswerChange: (newAnswer: string) => void;
	onSubAnswerDelete: (answerId: number) => void;
}

//
//
//

const CreationQuestionAnswerSubstituteBox = ({
	answer,
	onAnswerChange,
	onSubAnswerDelete,
}: CreationQuestionAnswerSubstituteBoxProps) => {
	return (
		<div className="flex gap-gap-9 bg-color-gray-10 rounded-medium1 p-padding-6">
			<AdjustableTextarea
				value={answer.answer || ""}
				placeholder="인정 답안"
				onChange={(e) => onAnswerChange(e.target.value)}
				className="w-full typo-body-medium"
			/>
			<DeleteCheckBox onClick={() => onSubAnswerDelete(answer.id)} />
		</div>
	);
};

export default CreationQuestionAnswerSubstituteBox;
