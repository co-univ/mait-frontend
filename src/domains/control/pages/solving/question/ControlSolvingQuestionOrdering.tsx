import { useParams } from "react-router-dom";
import ControlSolvingQuestionOrderingAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionOrderingAnswer";
import useControlSolvingQuestion from "@/domains/control/hooks/solving/question/useControlSolvingQuestion";
import type { OrderingQuestionApiResponse } from "@/libs/types";

//
//
//

const ControlSolvingQuestionOrdering = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { question } = useControlSolvingQuestion<OrderingQuestionApiResponse>({
		questionSetId,
		questionId,
	});

	const options = question?.options ?? [];

	return (
		<div className="flex flex-col gap-gap-11">
			{options?.map((option) => (
				<ControlSolvingQuestionOrderingAnswer key={option.id} option={option} />
			))}
		</div>
	);
};

export default ControlSolvingQuestionOrdering;
