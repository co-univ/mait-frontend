import AdjustableTextarea from "@/components/AdjustableTextarea";
import DeleteCheckBox from "@/components/DeleteCheckBox";

//
//
//

const CreationQuestionOrderingAnswer = () => {
	return (
		<div className="flex gap-gap-9 items-center">
			<span className="typo-heading-small">A</span>

			<div className="w-full flex items-center gap-gap-9 px-padding-12 py-padding-9 rounded-medium1 bg-color-gray-5">
				<AdjustableTextarea
					placeholder="보기 1"
					className="w-full typo-body-large"
				/>

				<DeleteCheckBox />
			</div>
		</div>
	);
};

export default CreationQuestionOrderingAnswer;
