import useQuestions from "@/hooks/useQuestions";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//
//
//

const CreationRedirect = () => {
  const navigate = useNavigate();
  const questionSetId = Number(useParams().questionSetId);

  const { questions } = useQuestions({ questionSetId });

  useEffect(() => {
    if (questions) {
      const firstQuestionId = questions[0]?.id;
      
      if (firstQuestionId) {
        navigate(
          `/creation/question-set/${questionSetId}/question/${firstQuestionId}`, { replace: true }
        );
      }
    }
  }, [questions, questionSetId]);

  return null;
};

export default CreationRedirect;