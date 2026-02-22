import CreationQuestionAnswerFillBlankBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerFillBlankBox";
import useCreationQuestionFillBlank from "@/domains/creation/hooks/question/_useCreationQuestionFillBlank";

//
//
//

interface CreationQuestionAnswerFillBlankProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionAnswerFillBlank = ({
	questionSetId,
	questionId,
}: CreationQuestionAnswerFillBlankProps) => {
	const {
		groupedAnswers,
		changeAnswer,
		addSubAnswer,
		deleteMainAnswer,
		deleteSubAnswer,
	} = useCreationQuestionFillBlank({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex flex-col gap-gap-11">
				{groupedAnswers.map((answers) => (
					<CreationQuestionAnswerFillBlankBox
						key={answers[0].id}
						answers={answers}
						onAnswerChange={changeAnswer}
						onSubAnswerAdd={() => addSubAnswer(answers[0].number)}
						onMainAnswerDelete={() => deleteMainAnswer(answers[0].number)}
						onSubAnswerDelete={deleteSubAnswer}
					/>
				))}
			</div>
		</div>
	);
};

export default CreationQuestionAnswerFillBlank;
