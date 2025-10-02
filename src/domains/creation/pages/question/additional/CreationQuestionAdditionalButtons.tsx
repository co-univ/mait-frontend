import { Check, Save } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { useCreationQuestion } from "@/domains/creation/hooks/question";

//
//
//

const CreationQuestionAdditionalButtons = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { handleUpdateQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex justify-end gap-gap-5">
			<Button
				icon={<Save />}
				item="임시저장"
				onClick={handleUpdateQuestion}
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
