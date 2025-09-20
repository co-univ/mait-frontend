import AdjustableTextarea from "@/components/AdjustableTextarea";
import CheckBox from "@/components/CheckBox";
import DeleteCheckBox from "@/components/DeleteCheckBox";

//
//
//

const CreationQuestionMultipleAnswer = () => {
	return (
		<div className="w-full flex items-center gap-gap-9 px-padding-12 py-padding-9 rounded-medium1 bg-color-gray-5">
			<CheckBox />

			<AdjustableTextarea
				placeholder="객관식 1번 선지"
				className="w-full typo-body-large"
			/>

			<DeleteCheckBox />
		</div>
	);
};

export default CreationQuestionMultipleAnswer;
