import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ControlSolvingQuestionShortAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionShortAnswer";
import useControlSolvingQuestionShort from "@/domains/control/hooks/solving/question/useControlSolvingQuestionShort";

//
//
//

interface ControlSolvingQuestionShortProps {
	readOnly: boolean;
	onRegisterSubmit: (handler: () => Promise<boolean>) => void;
}

//
//
//

const ControlSolvingQuestionShort = ({
	readOnly,
	onRegisterSubmit,
}: ControlSolvingQuestionShortProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		groupedAnswers,
		handleAnswerChange,
		handleSubAnswerAdd,
		handleSubAnswerDelete,
		handleAnswerAdd,
	} = useControlSolvingQuestionShort({
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
			{groupedAnswers?.map((answers) => (
				<ControlSolvingQuestionShortAnswer
					key={answers[0].id}
					readOnly={readOnly}
					answers={answers}
					onAnswerChange={handleAnswerChange}
					onSubAnswerAdd={handleSubAnswerAdd}
					onSubAnswerDelete={handleSubAnswerDelete}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionShort;
