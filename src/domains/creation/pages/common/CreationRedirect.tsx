import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuestions from "@/hooks/question/useQuestions";

//
//
//

const CreationRedirect = () => {
	const navigate = useNavigate();
	const questionSetId = Number(useParams().questionSetId);

	const { questions } = useQuestions({ questionSetId });

	// biome-ignore lint/correctness/useExhaustiveDependencies: navigate function is stable
	useEffect(() => {
		if (questions) {
			const firstQuestionId = questions[0]?.id;

			if (firstQuestionId) {
				navigate(
					`/creation/question-set/${questionSetId}/question/${firstQuestionId}`,
					{ replace: true },
				);
			}
		}
	}, [questions, questionSetId]);

	return null;
};

export default CreationRedirect;
