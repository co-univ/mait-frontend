import { useParams } from "react-router-dom";
import ControlSolvingQuestionFillBlankAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionFillBlankAnswer";
import useControlSolvingQuestionFillBlank from "@/domains/control/hooks/solving/question/useControlSolvingQuestionFillBlank";

//
//
//

interface ControlSolvingQuestionFillBlankProps {
	isEditing: boolean;
}

//
//
//

const ControlSolvingQuestionFillBlank = ({
	isEditing,
}: ControlSolvingQuestionFillBlankProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		grouppedQuestionAnswers,
		grouppedAddedAnswers,
		handleSubAnswerAdd,
		handleSubAnswerChange,
		handleSubAnswerDelete,
	} = useControlSolvingQuestionFillBlank({
		questionSetId,
		questionId,
		isEditing,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			{grouppedQuestionAnswers.map((questionAnswers, index) => (
				<ControlSolvingQuestionFillBlankAnswer
					key={questionAnswers[0]?.id}
					questionAnswers={questionAnswers}
					addedAnswers={grouppedAddedAnswers[index] || []}
					isEditing={isEditing}
					onSubAnswerChange={handleSubAnswerChange}
					onSubAnswerAdd={handleSubAnswerAdd}
					onSubAnswerDelete={handleSubAnswerDelete}
				/>
			))}
		</div>
	);
};

export default ControlSolvingQuestionFillBlank;
