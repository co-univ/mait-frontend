import { useParams } from "react-router-dom";
import ControlSolvingQuestionMultipleAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionMultipleAnswer";
import useControlSolvingQuestion from "@/domains/control/hooks/solving/question/useControlSolvingQuestion";
import type { MultipleQuestionApiResponse } from "@/libs/types";

//
//
//

const ControlSolvingQuestionMultiple = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { question } = useControlSolvingQuestion<MultipleQuestionApiResponse>({
		questionSetId,
		questionId,
	});

	const choices = question?.choices;

	return (
		<div className="flex flex-col gap-gap-11">
			{choices?.map((choice) => (
				<ControlSolvingQuestionMultipleAnswer
					key={choice.id}
					isCorrect={choice.isCorrect}
					content={choice.content}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionMultiple;
