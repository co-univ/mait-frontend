import { useParams } from "react-router-dom";
import ControlSolvingQuestionOrderingAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionOrderingAnswer";
import useControlSolvingQuestionOrdering from "@/domains/control/hooks/solving/question/useControlSolvingQuestionOrdering";

//
//
//

interface ControlSolvingQuestionOrderingProps {
	readOnly: boolean;
}

//
//
//

const ControlSolvingQuestionOrdering = ({
	readOnly,
}: ControlSolvingQuestionOrderingProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { options } = useControlSolvingQuestionOrdering({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			{options.map((option) => (
				<ControlSolvingQuestionOrderingAnswer
					key={option.id}
					readOnly={readOnly}
					option={option}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionOrdering;
