import { Plus } from "lucide-react";
import Button from "@/components/Button";
import CreationQuestionAnswerShortBox from "@/domains/creation/components/question/answer/CreationQuestionAnswerShortBox";
import useCreationQuestionShort from "@/domains/creation/hooks/question/useCreationQuestionShort";

//
//
//

interface CreationQuestionAnswerShortProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionShort = ({
	questionSetId,
	questionId,
}: CreationQuestionAnswerShortProps) => {
	const {
		groupedAnswers,
		changeAnswer,
		addMainAnswer,
		addSubAnswer,
		deleteMainAnswer,
		deleteSubAnswer,
	} = useCreationQuestionShort({
		questionSetId,
		questionId,
	});

	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex flex-col gap-gap-11">
				{groupedAnswers.map((answers) => (
					<CreationQuestionAnswerShortBox
						key={answers[0].id}
						answers={answers}
						onAnswerChange={changeAnswer}
						onSubAnswerAdd={addSubAnswer}
						onMainAnswerDelete={deleteMainAnswer}
						onSubAnswerDelete={deleteSubAnswer}
					/>
				))}
			</div>

			<div className="self-center">
				<Button
					icon={<Plus />}
					item={<span className="typo-body-medium">답안추가</span>}
					onClick={addMainAnswer}
					className="bg-color-gray-5 border-none"
				/>
			</div>
		</div>
	);
};

export default CreationQuestionShort;
