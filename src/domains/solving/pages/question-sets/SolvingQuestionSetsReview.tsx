import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetDto } from "@/libs/types";
import SolvingQuestionSetsReviewCard from "../../components/question-sets/SolvingQuestionSetsReviewCard";

//
//
//

interface SolvingQuestionSetsReviewProps {
	questionSets: QuestionSetDto[];
	isLoading: boolean;
}

//
//
//

const SolvingQuestionSetsReview = ({
	questionSets,
	isLoading,
}: SolvingQuestionSetsReviewProps) => {
	return (
		<div className="flex flex-col gap-gap-11 h-full">
			<div className="flex justify-between items-center">
				{/*
				 *
				 */}
			</div>

			<QuestionSetsCardsLayout isLoading={isLoading}>
				{questionSets.map((questionSet) => (
					<SolvingQuestionSetsReviewCard
						key={questionSet.id}
						questionSet={questionSet}
					/>
				))}
			</QuestionSetsCardsLayout>
		</div>
	);
};

export default SolvingQuestionSetsReview;
