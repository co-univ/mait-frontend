import { Check, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { useCreationQuestion } from "@/domains/creation/hooks/question";

//
//
//

const CreationQuestionAdditionalButtons = () => {
	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const navigate = useNavigate();

	const { handleUpdateQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const handleUpdateButtonClick = async () => {
		const res = await handleUpdateQuestion();
		const questionId = res?.data?.id;

		navigate(
			`/creation/question/team/${teamId}/question-set/${questionSetId}/question/${questionId}`,
		);
	};

	/**
	 *
	 */
	const handleCreateButtonClick = () => {
		navigate(`/creation/publish/team/${teamId}/question-set/${questionSetId}`);
	};

	return (
		<div className="flex justify-end gap-gap-5">
			<Button
				icon={<Save />}
				item="임시저장"
				onClick={handleUpdateButtonClick}
				className="bg-color-gray-5 border-none"
			/>
			<Button
				icon={<Check />}
				item="생성하기"
				onClick={handleCreateButtonClick}
				className="bg-color-primary-5 border-none text-color-primary-50"
			/>
		</div>
	);
};

export default CreationQuestionAdditionalButtons;
