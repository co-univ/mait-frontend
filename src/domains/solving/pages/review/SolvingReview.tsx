import { useParams } from "react-router-dom";
import QuestionContent from "@/components/QuestionContent";
import SolvingQuizImage from "../../components/common/SolvingQuizImage";
import useSolvingReviewQuestion from "../../hooks/review/useSolvingReviewQuestion";
import useSolvingReviewQuestions from "../../hooks/review/useSolvingReviewQuestions";
import SolvingLayout from "../../layouts/common/SolvingLayout";
import SolvingReviewControl from "./SolvingReviewControl";

//
//
//

const SolvingReview = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions } = useSolvingReviewQuestions({ questionSetId });
	const { content, number, imageUrl, type } = useSolvingReviewQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const renderQuestionAnswers = () => {
		if (!type) {
			return null;
		}

		switch (type) {
			case "MULTIPLE":
				return <div>Multiple Choice Answers Placeholder</div>;
			case "SHORT":
				return <div>Short Answer Placeholder</div>;
			case "ORDERING":
				return <div>Ordering Answers Placeholder</div>;
			case "FILL_BLANK":
				return <div>Fill in the Blank Answers Placeholder</div>;
			default:
				return null;
		}
	};

	return (
		<SolvingLayout>
			<SolvingReviewControl
				questionSetId={questionSetId}
				questionId={questionId}
				number={number}
				questions={questions}
			/>
			<QuestionContent content={content} className="typo-heading-small" />
			{imageUrl && <SolvingQuizImage src={imageUrl} />}
			<div className="flex-grow h-size-height-5" />
			{renderQuestionAnswers()}
		</SolvingLayout>
	);
};

export default SolvingReview;
