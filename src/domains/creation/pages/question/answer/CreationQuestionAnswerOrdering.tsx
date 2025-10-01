import { Plus } from "lucide-react";
import Button from "@/components/Button";
import CreationQuestionAnswerOrderingBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerOrderingBox";
import CreationQuestionOrderingDragDrop from "./CreationQuestionAnswerOrderingDragDrop";

//
//
//

const CreationQuestionOrdering = () => {
	return (
		<div className="flex flex-col gap-gap-11">
			<span className="typo-body-large">보기</span>

			<div className="flex flex-col gap-gap-11">
				<CreationQuestionAnswerOrderingBox />
				<CreationQuestionAnswerOrderingBox />
			</div>

			<div className="self-center">
				<Button
					icon={<Plus />}
					item={<span className="typo-body-medium">답안추가</span>}
				/>
			</div>

			<div className="flex flex-col gap-gap-5">
				<span className="typo-body-large">정답</span>

				<CreationQuestionOrderingDragDrop />
			</div>
		</div>
	);
};

export default CreationQuestionOrdering;
