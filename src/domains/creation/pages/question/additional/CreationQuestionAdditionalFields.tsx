import { ListChecks, SquareCheckBig } from "lucide-react";
import { useParams } from "react-router-dom";
import { Field } from "@/components/field";
import { useCreationQuestion } from "@/domains/creation/hooks/question";
import QuestionAnswerString from "@/utils/question-answer-string";

//
//
//

const CreationQuestionAdditionalFields = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { question, handleExplanationChange } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11 w-full">
			<Field.Root>
				<Field.Label className="flex items-center gap-gap-5 typo-body-large">
					<SquareCheckBig className="text-color-success-50" />
					정답
				</Field.Label>

				<div className="bg-color-success-5 h-[196px] py-padding-10 px-padding-11 border border-color-success-50 rounded-medium1">
					<textarea
						disabled
						value={question && QuestionAnswerString(question)}
						className="bg-inherit w-full h-full resize-none focus-visible:outline-none typo-body-large"
					/>
				</div>
			</Field.Root>

			<Field.Root>
				<Field.Label className="flex items-center gap-gap-5 typo-body-large">
					<ListChecks className="text-color-primary-50" />
					해설
				</Field.Label>

				<div className="bg-color-primary-5 h-[196px] py-padding-10 px-padding-11 border border-color-primary-50 rounded-medium1">
					<textarea
						value={question?.explanation || ""}
						onChange={(e) => handleExplanationChange(e.target.value)}
						className="bg-inherit w-full h-full resize-none focus-visible:outline-none typo-body-small text-color-gray-40"
					/>
				</div>
			</Field.Root>
		</div>
	);
};

export default CreationQuestionAdditionalFields;
