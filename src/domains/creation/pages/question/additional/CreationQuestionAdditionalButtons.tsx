import { Check, Save } from "lucide-react";
import Button from "@/components/Button";

//
//
//

const CreationQuestionAdditionalButtons = () => {
	return (
		<div className="flex justify-end gap-gap-5">
			<Button
				icon={<Save />}
				item="임시저장"
				className="bg-color-gray-5 border-none"
			/>
			<Button
				icon={<Check />}
				item="생성하기"
				className="bg-color-primary-5 border-none text-color-primary-50"
			/>
		</div>
	);
};

export default CreationQuestionAdditionalButtons;
