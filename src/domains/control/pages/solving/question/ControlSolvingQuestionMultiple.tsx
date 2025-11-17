import { useParams } from "react-router-dom";
import ControlSolvingQuestionMultipleAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionMultipleAnswer";
import useControlSolvingQuestionMultiple from "@/domains/control/hooks/solving/question/useControlSolvingQuestionMultiple";

//
//
//

interface ControlSolvingQuestionMultipleProps {
	readOnly: boolean;
}

//
//
//

const ControlSolvingQuestionMultiple = ({
	readOnly,
}: ControlSolvingQuestionMultipleProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { choices } = useControlSolvingQuestionMultiple({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			{choices?.map((choice) => (
				<ControlSolvingQuestionMultipleAnswer
					key={choice.id}
					readOnly={readOnly}
					isCorrect={choice.isCorrect}
					content={choice.content}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionMultiple;
