import { useParams } from "react-router-dom";
import ControlSolvingQuestionFillBlankAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionFillBlankAnswer";
import useControlSolvingQuestionFillBlank from "@/domains/control/hooks/solving/question/useControlSolvingQuestionFillBlank";

//
//
//

interface ControlSolvingQuestionFillBlankProps {
	readOnly: boolean;
}

//
//
//

const ControlSolvingQuestionFillBlank = ({
	readOnly,
}: ControlSolvingQuestionFillBlankProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { groupedAnswers } = useControlSolvingQuestionFillBlank({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			{groupedAnswers.map((answers) => (
				<ControlSolvingQuestionFillBlankAnswer
					key={answers[0].id}
					readOnly={readOnly}
					answers={answers}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionFillBlank;
