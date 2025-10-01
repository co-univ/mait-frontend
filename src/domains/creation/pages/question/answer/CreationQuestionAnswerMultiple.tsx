import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import CreationQuestionAnswerMultipleBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerMultipleBox";
import { useCreationQuestionMultiple } from "@/domains/creation/hooks/question";
import type { MultipleChoiceDto } from "@/libs/types";

//
//
//

const CreationQuestionMultiple = () => {
	const questionId = Number(useParams().questionId);

	const {
		question,
		handleChoiceCorrect,
		handleChoiceContentChange,
		handleChoiceAdd,
		handleChoiceDelete,
	} = useCreationQuestionMultiple({
		questionId,
	});

	/**
	 *
	 */
	const renderChoices = () => {
		return question?.choices.map((choice) => {
			/**
			 *
			 */
			const handleCorrectChange = (isCorrect: boolean) => {
				handleChoiceCorrect(choice.id, isCorrect);
			};

			/**
			 *
			 */
			const handleContentChange = (content: string) => {
				handleChoiceContentChange(choice.id, content);
			};

			/**
			 *
			 */
			const handleDelete = () => {
				handleChoiceDelete(choice.id);
			};

			return (
				<CreationQuestionAnswerMultipleBox
					key={choice.id}
					choice={choice as MultipleChoiceDto}
					onCorrectChange={handleCorrectChange}
					onContentChange={handleContentChange}
					onChoiceDelete={handleDelete}
				/>
			);
		});
	};

	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex flex-col gap-gap-11">{renderChoices()}</div>

			<div className="self-center">
				<Button
					icon={<Plus />}
					item="답안추가"
					onClick={handleChoiceAdd}
					className="bg-color-gray-5 border-none"
				/>
			</div>
		</div>
	);
};

export default CreationQuestionMultiple;
