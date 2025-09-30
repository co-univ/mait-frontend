import { useNavigate, useParams } from "react-router-dom";
import QuestionNavigation from "@/components/question-navigation";
import CreationLayout from "@/domains/creation/layouts/common/CreationLayout";
import CreationQuestion from "@/domains/creation/pages/question/CreationQuestion";

//
//
//

const Creation = () => {
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
			<CreationQuestion />
			<div className="w-[268px] h-full bg-black"></div>
		</CreationLayout>
	);
};

export default Creation;
