import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCreationQuestions from "@/domains/creation/hooks/question/useCreationQuestions";

//
//
//

const CreationRedirect = () => {
	const navigate = useNavigate();

	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);

	const { questions, isLoading } = useCreationQuestions({ questionSetId });

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: navigate function is stable
	useEffect(() => {
		if (questions && !isLoading) {
			const firstQuestionId = questions[0]?.id ?? 0;

			navigate(
				`/creation/question/team/${teamId}/question-set/${questionSetId}/question/${firstQuestionId}`,
				{ replace: true },
			);
		}
	}, [questions, questionSetId, isLoading]);

	return null;
};

export default CreationRedirect;
