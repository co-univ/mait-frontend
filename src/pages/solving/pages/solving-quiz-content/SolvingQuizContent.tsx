import { useEffect } from "react";
import { QuestionType } from "src/enums/solving.enum";
import type { QuestionApiResponse } from "@/types";
import SolvingQuizImage from "../../components/SolvingQuizImage";
import SolvingQuizTitle from "../../components/solving-quiz-title";
import SolvingQuizContentBlankAnswer from "./SolvingQuizContentBlankAnswer";
import SolvingQuizContentMultipleAnswers from "./SolvingQuizContentMultipleAnswers";
import SolvingQuizContentOrderAnswers from "./SolvingQuizContentOrderAnswers";
import SolvingQuizContentShortAnswer from "./SolvingQuizContentShortAnswer";

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

	useEffect(() => {
		console.log("d", questionInfo);
		console.log("type", questionInfo?.type);
	}, [questionInfo]);

	return (
		<div className="flex flex-col w-full flex-1">
			<SolvingQuizTitle
				title={questionInfo?.content || ""}
				type={type as QuestionType}
			/>
			{/* <SolvingQuizImage src="https://cotatos3.s3.ap-northeast-2.amazonaws.com/session/c71fff82-b7f9-4f9c-87aa-48f1b22bcc5f.jpeg" /> */}
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
