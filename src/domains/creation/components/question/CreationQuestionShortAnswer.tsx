import { Plus } from "lucide-react";
import AdjustableTextarea from "@/components/AdjustableTextarea";
import Button from "@/components/Button";
import DeleteCheckBox from "@/components/DeleteCheckBox";
import CreatoinQuestionSubstituteAnswer from "./CreatoinQuestionSubstituteAnswer";

//
//
//

const CreationQuestionShortAnswer = () => {
	return (
		<div className="w-full flex flex-col gap-gap-6 px-padding-12 py-padding-9 rounded-medium1 bg-color-gray-5">
			<div className="flex items-center gap-gap-9">
				<AdjustableTextarea
					placeholder="주관식 답안"
					className="flex-1 typo-body-large"
				/>

				<div className="flex gap-gap-5 items-center">
					<Button
						icon={<Plus />}
						item="답안 추가"
						className="bg-color-gray-10"
					/>
					<DeleteCheckBox />
				</div>
			</div>

			<div className="flex flex-col gap-gap-6">
				<CreatoinQuestionSubstituteAnswer />
				<CreatoinQuestionSubstituteAnswer />
			</div>
		</div>
	);
};

export default CreationQuestionShortAnswer;
