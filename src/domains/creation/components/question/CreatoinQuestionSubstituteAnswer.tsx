import AdjustableTextarea from "@/components/AdjustableTextarea";
import DeleteCheckBox from "@/components/DeleteCheckBox";

//
//
//

const CreatoinQuestionSubstituteAnswer = () => {
	return (
		<div className="flex gap-gap-9 bg-color-gray-10 rounded-medium1 p-padding-6">
			<AdjustableTextarea
				placeholder="인정 답안 1"
				className="w-full typo-body-medium"
			/>
			<DeleteCheckBox />
		</div>
	);
};

export default CreatoinQuestionSubstituteAnswer;
