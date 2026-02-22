import { Plus } from "lucide-react";
import Button from "@/components/Button";
import CreationQuestionAnswerMultipleBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerMultipleBox";
import useCreationQuestionMultiple from "@/domains/creation/hooks/question/_useCreationQuestionMultiple";

//
//
//

interface CreationQuestionAnswerMultipleProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionMultiple = ({
	questionSetId,
	questionId,
}: CreationQuestionAnswerMultipleProps) => {
	const {
		question,
		changeChoiceCorrect,
		changeChoiceContent,
		addChoice,
		deleteChoice,
	} = useCreationQuestionMultiple({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex flex-col gap-gap-11">
				{question?.choices.map((choice) => (
					<CreationQuestionAnswerMultipleBox
						key={choice.id}
						choice={choice}
						onCorrectChange={(isCorrect) =>
							changeChoiceCorrect(choice.id, isCorrect)
						}
						onContentChange={(content) =>
							changeChoiceContent(choice.id, content)
						}
						onDelete={() => deleteChoice(choice.id)}
					/>
				))}
			</div>

			<div className="self-center">
				<Button
					icon={<Plus />}
					item="답안추가"
					onClick={addChoice}
					className="bg-color-gray-5 border-none"
				/>
			</div>
		</div>
	);
};

export default CreationQuestionMultiple;
