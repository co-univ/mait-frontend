import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import CreationQuestionAnswerShortBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerShortBox";
import useCreationQuestionShort from "@/domains/creation/hooks/question/useCreationQuestionShort";

//
//
//

const CreationQuestionShort = () => {
	const questionId = Number(useParams().questionId);

	const {
		groupedAnswers,
		handleAnswerChange,
		handleMainAnswerAdd,
		handleSubAnswerAdd,
		handleMainAnswerDelete,
		handleSubAnswerDelete,
	} = useCreationQuestionShort({
		questionId,
	});

	/**
	 *
	 */
	const renderAnswers = () => {
		return groupedAnswers.map((answers) => {
			return (
				<CreationQuestionAnswerShortBox
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

			<div className="self-center">
				<Button
					icon={<Plus />}
					item={<span className="typo-body-medium">답안추가</span>}
					onClick={handleMainAnswerAdd}
					className="bg-color-gray-5 border-none"
				/>
			</div>
		</div>
	);
};

export default CreationQuestionShort;
