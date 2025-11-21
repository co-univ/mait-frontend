import SolvingQuestionTitle from "src/domains/solving/components/common/quiz-title";
import { QuestionType } from "src/enums/solving.enum";
import type { QuestionApiResponse } from "@/types";
import SolvingQuizContentBlankAnswer from "./SolvingQuizContentBlankAnswer";
import SolvingQuizContentMultipleAnswers from "./SolvingQuizContentMultipleAnswers";
import SolvingQuizContentOrderAnswers from "./SolvingQuizContentOrderAnswers";
import SolvingQuizContentShortAnswer from "./SolvingQuizContentShortAnswer";
import SolvingQuizImage from "../SolvingQuizImage";

//
//
//

interface SolvingQuizContentProps {
	questionInfo: QuestionApiResponse | null;
	userAnswers: any;
	onAnswersChange: (answers: any) => void;
	disabled?: boolean;
}

//
//
//

const SolvingQuizContent = ({
	questionInfo,
	userAnswers,
	onAnswersChange,
	disabled = false,
}: SolvingQuizContentProps) => {
	const type = questionInfo?.type;

	return (
		<div className="flex flex-col w-full flex-1">
			<SolvingQuestionTitle
				title={questionInfo?.content || ""}
				type={type as QuestionType}
				questionInfo={questionInfo}
				userAnswers={userAnswers}
			/>
			<SolvingQuizImage src={questionInfo?.imageUrl} />
			<div className="flex-grow h-size-height-5" />
			{type === QuestionType.SHORT && (
				<SolvingQuizContentShortAnswer
					questionInfo={questionInfo}
					userAnswers={userAnswers}
					onAnswersChange={onAnswersChange}
					isAnswered={disabled}
				/>
			)}
			{type === QuestionType.MULTIPLE && (
				<SolvingQuizContentMultipleAnswers
					questionInfo={questionInfo}
					userAnswers={userAnswers}
					onAnswersChange={onAnswersChange}
					isAnswered={disabled}
				/>
			)}
			{type === QuestionType.FILL_BLANK && (
				<SolvingQuizContentBlankAnswer
					questionInfo={questionInfo}
					userAnswers={userAnswers}
					onAnswersChange={onAnswersChange}
					isAnswered={disabled}
				/>
			)}
			{type === QuestionType.ORDERING && (
				<SolvingQuizContentOrderAnswers
					questionInfo={questionInfo}
					userAnswers={userAnswers}
					onAnswersChange={onAnswersChange}
					isAnswered={disabled}
				/>
			)}
		</div>
	);
};

export default SolvingQuizContent;
