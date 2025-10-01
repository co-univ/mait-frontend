import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import CreationQuestionAnswerOriginOrderBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerOriginOrderBox";
import useCreationQuestionOrdering from "@/domains/creation/hooks/question/useCreationQuestionOrdering";
import CreationQuestionOrderingDragDrop from "./CreationQuestionAnswerOrderingDragDrop";

//
//
//

const CreationQuestionOrdering = () => {
	const questionId = Number(useParams().questionId);

	const {
		originOrderOptions,
		answerOrderOptions,
		handleOptionContentChange,
		handleAnswerOrderChange,
		handleOptionAdd,
		handleOptionDelete,
	} = useCreationQuestionOrdering({ questionId });

	/**
	 *
	 */
	const renderOriginOrderOptions = () => {
		return originOrderOptions.map((option) => {
			/**
			 *
			 */
			const handleContentChange = (content: string) => {
				handleOptionContentChange(option.id, content);
			};

			return (
				<CreationQuestionAnswerOriginOrderBox
					key={option.id}
					option={option}
					onContentChange={handleContentChange}
					onOptionDelete={handleOptionDelete}
				/>
			);
		});
	};

	return (
		<div className="flex flex-col gap-gap-11">
			<span className="typo-body-large">보기</span>

			<div className="flex flex-col gap-gap-11">
				{renderOriginOrderOptions()}
			</div>

			<div className="self-center">
				<Button
					icon={<Plus />}
					item={<span className="typo-body-medium">답안추가</span>}
					onClick={handleOptionAdd}
				/>
			</div>

			<div className="flex flex-col gap-gap-5">
				<span className="typo-body-large">정답</span>

				<CreationQuestionOrderingDragDrop
					answerOrderOptions={answerOrderOptions}
					onAnswerOrderChange={handleAnswerOrderChange}
				/>
			</div>
		</div>
	);
};

export default CreationQuestionOrdering;
