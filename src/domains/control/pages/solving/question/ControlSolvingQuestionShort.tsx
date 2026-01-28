import { useParams } from "react-router-dom";
import ControlSolvingQuestionShortAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionShortAnswer";
import useControlSolvingQuestionShort from "@/domains/control/hooks/solving/question/useControlSolvingQuestionShort";

//
//
//

interface ControlSolvingQuestionShortProps {
	isEditing: boolean;
}

//
//
//

const ControlSolvingQuestionShort = ({
	isEditing,
}: ControlSolvingQuestionShortProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		grouppedQuestionAnswers,
		grouppedAddedAnswers,
		handleSubAnswerAdd,
		handleSubAnswerChange,
		handleSubAnswerDelete,
	} = useControlSolvingQuestionShort({
		questionSetId,
		questionId,
		isEditing,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			{grouppedQuestionAnswers.map((questionAnswers, index) => (
				<ControlSolvingQuestionShortAnswer
					key={questionAnswers[0].id}
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

export default ControlSolvingQuestionShort;
