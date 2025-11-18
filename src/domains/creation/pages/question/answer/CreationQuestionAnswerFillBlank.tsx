import { useParams } from "react-router-dom";
import CreationQuestionAnswerFillBlankBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerFillBlankBox";
import useCreationQuestionFillBlank from "@/domains/creation/hooks/question/useCreationQuestionFillBlank";

//
//
//

const CreationQuestionAnswerFillBlank = () => {
	const questionId = Number(useParams().questionId);

	const {
		groupedAnswers,
		handleAnswerChange,
		handleSubAnswerAdd,
		handleMainAnswerDelete,
		handleSubAnswerDelete,
	} = useCreationQuestionFillBlank({
		questionId,
	});

	/**
	 *
	 */
	const renderAnswers = () => {
		return groupedAnswers.map((answers) => {
			return (
				<CreationQuestionAnswerFillBlankBox
					key={answers[0].id}
					answers={answers}
					onAnswerChange={handleAnswerChange}
					onSubAnswerAdd={handleSubAnswerAdd}
					onMainAnswerDelete={handleMainAnswerDelete}
					onSubAnswerDelete={handleSubAnswerDelete}
				/>
			);
		});
	};

	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex flex-col gap-gap-11">{renderAnswers()}</div>
		</div>
	);
};

export default CreationQuestionAnswerFillBlank;
