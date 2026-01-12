import { useState } from "react";
import { useParams } from "react-router-dom";
import QuestionContent from "@/components/QuestionContent";
import SolvingQuizImage from "../../components/common/SolvingQuizImage";
import SolvingSubmitResult from "../../components/common/SolvingSubmitResult";
import useSolvingReviewQuestion from "../../hooks/review/useSolvingReviewQuestion";
import useSolvingReviewQuestions from "../../hooks/review/useSolvingReviewQuestions";
import SolvingLayout from "../../layouts/common/SolvingLayout";
import SolvingReviewControl from "./SolvingReviewControl";
import SolvingReviewExplanation from "./SolvingReviewExplanation";
import SolvingReviewFillBlankAnswers from "./SolvingReviewFillBlankAnswers";
import SolvingReviewMultipleAnswers from "./SolvingReviewMultipleAnswers";
import SolvingReviewOrderingAnswers from "./SolvingReviewOrderingAnswers";
import SolvingReviewShortAnswers from "./SolvingReviewShortAnswers";

//
//
//

const SolvingReview = () => {
	const [isSolvingResultShown, setIsSolvingResultShown] = useState<
		Record<number, boolean>
	>({});

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions } = useSolvingReviewQuestions({ questionSetId });
	const {
		isSubmitted,
		isCorrect,
		isExplanationShown,
		content,
		answer,
		explanation,
		number,
		imageUrl,
		type,
		handleAnswersSubmit,
		showExplanation,
		hideExplanation,
	} = useSolvingReviewQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */

	/**
	 *
	 */
	const handleSolvingResultAnimationComplete = () => {
		const timer = setTimeout(() => {
			setIsSolvingResultShown((prev) => ({
				...prev,
				[questionId]: true,
			}));
		}, 2000);

		return () => clearTimeout(timer);
	};

	/**
	 *
	 */
	const renderQuestionAnswers = () => {
		if (!type) {
			return null;
		}

		switch (type) {
			case "MULTIPLE":
				return (
					<SolvingReviewMultipleAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "SHORT":
				return (
					<SolvingReviewShortAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "ORDERING":
				return (
					<SolvingReviewOrderingAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			case "FILL_BLANK":
				return (
					<SolvingReviewFillBlankAnswers
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<SolvingLayout>
			<SolvingReviewControl
				isSubmitted={isSubmitted}
				isCorrect={isCorrect}
				isExplanationShown={isExplanationShown}
				questionSetId={questionSetId}
				questionId={questionId}
				number={number}
				questions={questions}
				handleAnswersSubmit={handleAnswersSubmit}
				showExplanation={showExplanation}
				hideExplanation={hideExplanation}
			/>

			<QuestionContent content={content} />

			<SolvingQuizImage src={imageUrl} />

			<div className="h-full flex flex-col justify-end">
				{renderQuestionAnswers()}
			</div>

			<SolvingReviewExplanation
				isExplanationShown={isExplanationShown}
				isCorrect={isCorrect}
				answer={answer ?? ""}
				explanation={explanation}
			/>

			<SolvingSubmitResult
				correct={!!isCorrect}
				show={isSubmitted && !isSolvingResultShown[questionId]}
				onAnimationComplete={handleSolvingResultAnimationComplete}
			/>
		</SolvingLayout>
	);
};

export default SolvingReview;
