import { Plus } from "lucide-react";
import Button from "@/components/Button";
import CreationQuestionAnswerShortBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerShortBox";

//
//
//

const CreationQuestionShort = () => {
	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex flex-col gap-gap-11">
				<CreationQuestionAnswerShortBox />
			</div>

			<div className="self-center">
				<Button
					icon={<Plus />}
					item={<span className="typo-body-medium">답안추가</span>}
				/>
			</div>
		</div>
	);
};

export default CreationQuestionShort;
