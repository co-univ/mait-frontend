import { Plus } from "lucide-react";
import Button from "@/components/Button";
import CreationQuestionAnswerOriginOrderBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerOriginOrderBox";
import useCreationQuestionOrdering from "@/domains/creation/hooks/question/useCreationQuestionOrdering";
import CreationQuestionOrderingDragDrop from "./CreationQuestionAnswerOrderingDragDrop";

//
//
//

interface CreationQuestionOrderingProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionOrdering = ({
	questionSetId,
	questionId,
}: CreationQuestionOrderingProps) => {
	const {
		originOrderOptions,
		answerOrderOptions,
		changeOptionContent,
		changeAnswerOrder,
		addOption,
		deleteOption,
	} = useCreationQuestionOrdering({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			<span className="typo-body-large">보기</span>

			<div className="flex flex-col gap-gap-11">
				{originOrderOptions?.map((option) => (
					<CreationQuestionAnswerOriginOrderBox
						key={option.id}
						option={option}
						onContentChange={(content) =>
							changeOptionContent(option.id, content)
						}
						onOptionDelete={() => deleteOption(option.id)}
					/>
				))}
			</div>

			<div className="self-center">
				<Button
					icon={<Plus />}
					item={<span className="typo-body-medium">답안추가</span>}
					onClick={addOption}
					className="bg-color-gray-5 border-none"
				/>
			</div>

			<div className="flex flex-col gap-gap-5">
				<span className="typo-body-large">정답</span>

				<CreationQuestionOrderingDragDrop
					answerOrderOptions={answerOrderOptions ?? []}
					onAnswerOrderChange={changeAnswerOrder}
				/>
			</div>
		</div>
	);
};

export default CreationQuestionOrdering;
