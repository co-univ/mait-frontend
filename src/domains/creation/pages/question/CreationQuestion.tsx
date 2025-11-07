import { useNavigate, useParams } from "react-router-dom";
import QuestionNavigation from "@/components/question-navigation";
import {
	useCreationQuestion,
	useCreationQuestions,
} from "@/domains/creation/hooks/question";
import CreationQuestionLayout from "@/domains/creation/layouts/question/CreationQuestionLayout";
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
		<CreationQuestionLayout>
			<QuestionNavigation
				canDelete
				questionSetId={questionSetId}
				activeQuestionId={questionId}
				onQuestionClick={handleQuestionNavigationClick}
				onQuestionAdd={handleAddQuestion}
				onQuestionDelete={handleDeleteQuestion}
			/>
			{questionId !== 0 ? (
				<>
					<CreationQuestionMain />
					<CreationQuestionAdditional />
				</>
			) : (
				<div className="flex flex-1 justify-center items-center typo-heading-large">
					문제를 만들어야함
				</div>
			)}
		</CreationQuestionLayout>
	);
};

export default CreationQuestion;
