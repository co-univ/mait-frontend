import { useNavigate, useParams } from "react-router-dom";
import QuestionNavigation from "@/components/question-navigation";
import CreationLayout from "@/domains/creation/layouts/common/CreationLayout";
import CreationQuestionMain from "@/domains/creation/pages/question/CreationQuestionMain";

//
//
//

const CreationQuestion = () => {
	const navigate = useNavigate();

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	/**
	 *
	 */
	const handleQuestionNavigationClick = (questionId: number) => {
		navigate(`/creation/question-set/${questionSetId}/question/${questionId}`);
	};

	return (
		<CreationLayout>
			<QuestionNavigation
				canDelete
				questionSetId={questionSetId}
				activeQuestionId={questionId}
				onQuestionClick={handleQuestionNavigationClick}
			/>
			<CreationQuestionMain />
			<div className="w-[268px] h-full bg-black"></div>
		</CreationLayout>
	);
};

export default CreationQuestion;
