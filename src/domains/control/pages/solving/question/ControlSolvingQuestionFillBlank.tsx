import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ControlSolvingQuestionFillBlankAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionFillBlankAnswer";
import useControlSolvingQuestionFillBlank from "@/domains/control/hooks/solving/question/useControlSolvingQuestionFillBlank";

//
//
//

interface ControlSolvingQuestionFillBlankProps {
	readOnly: boolean;
	onRegisterSubmit: (handler: () => Promise<boolean>) => void;
}

//
//
//

const ControlSolvingQuestionFillBlank = ({
	readOnly,
	onRegisterSubmit,
}: ControlSolvingQuestionFillBlankProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		groupedAnswers,
		handleAnswerChange,
		handleSubAnswerAdd,
		handleSubAnswerDelete,
		handleAnswerAdd,
	} = useControlSolvingQuestionFillBlank({
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
				<ControlSolvingQuestionFillBlankAnswer
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

export default ControlSolvingQuestionFillBlank;
