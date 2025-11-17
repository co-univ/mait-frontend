import { useParams } from "react-router-dom";
import ControlSolvingQuestionShortAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionShortAnswer";
import useControlSolvingQuestionShort from "@/domains/control/hooks/solving/question/useControlSolvingQuestionShort";

//
//
//

interface ControlSolvingQuestionShortProps {
	readOnly: boolean;
}

//
//
//

const ControlSolvingQuestionShort = ({
	readOnly,
}: ControlSolvingQuestionShortProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { groupedAnswers } = useControlSolvingQuestionShort({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			{groupedAnswers.map((answers) => (
				<ControlSolvingQuestionShortAnswer
					key={answers[0].id}
					readOnly={readOnly}
					answers={answers}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionShort;
