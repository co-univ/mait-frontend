import { Plus } from "lucide-react";
import Button from "@/components/Button";
import CreationQuestionAnswerMultipleBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerMultipleBox";

//
//
//

const CreationQuestionMultiple = () => {
	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex flex-col gap-gap-11">
				<CreationQuestionAnswerMultipleBox />
				<CreationQuestionAnswerMultipleBox />
			</div>

			<div className="self-center">
				<Button icon={<Plus />} item="답안추가" />
			</div>
		</div>
	);
};

export default CreationQuestionMultiple;
