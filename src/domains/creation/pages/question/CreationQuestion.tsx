import { useNavigate, useParams } from "react-router-dom";
import QuestionNavigation from "@/components/question-navigation";
import {
	useCreationQuestion,
	useCreationQuestions,
} from "@/domains/creation/hooks/question";
import CreationLayout from "@/domains/creation/layouts/common/CreationLayout";
import CreationQuestionAdditional from "@/domains/creation/pages/question/additional/CreationQuestionAdditional";
import CreationQuestionMain from "@/domains/creation/pages/question/CreationQuestionMain";

//
//
//

const CreationQuestion = () => {
	const navigate = useNavigate();

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { handleAddQuestion } = useCreationQuestions({ questionSetId });
	const { handleUpdateQuestion, handleDeleteQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const handleQuestionNavigationClick = (newQuestionId: number) => {
		handleUpdateQuestion();

		navigate(
			`/creation/question-set/${questionSetId}/question/${newQuestionId}`,
		);
	};

	return (
		<CreationLayout>
			<QuestionNavigation
				canDelete
				questionSetId={questionSetId}
				activeQuestionId={questionId}
				onQuestionClick={handleQuestionNavigationClick}
				onQuestionAdd={handleAddQuestion}
				onQuestionDelete={handleDeleteQuestion}
			/>

			<CreationQuestionMain />

			<CreationQuestionAdditional />
		</CreationLayout>
	);
};

export default CreationQuestion;
