import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ControlSolvingQuestionMultipleAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionMultipleAnswer";
import useControlSolvingQuestionMultiple from "@/domains/control/hooks/solving/question/useControlSolvingQuestionMultiple";

//
//
//

interface ControlSolvingQuestionMultipleProps {
	readOnly: boolean;
	onRegisterSubmit: (handler: (() => Promise<boolean>)) => void;
}

//
//
//

const ControlSolvingQuestionMultiple = ({
	readOnly,
	onRegisterSubmit,
}: ControlSolvingQuestionMultipleProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { choices, handleCheckChoice, handleAnswerAdd } = useControlSolvingQuestionMultiple({
		questionSetId,
		questionId,
	});

	//
	//
	//
	useEffect(() => {
		onRegisterSubmit(handleAnswerAdd);
	}, [onRegisterSubmit, handleAnswerAdd]);

	return (
		<div className="flex flex-col gap-gap-11">
			{choices?.map((choice) => (
				<ControlSolvingQuestionMultipleAnswer
					key={choice.id}
					readOnly={readOnly}
					isCorrect={choice.isCorrect}
					content={choice.content}
					onChange={(checked) => handleCheckChoice(choice.id, checked)}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionMultiple;
