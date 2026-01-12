import QuestionSetsFilter from "@/components/question-sets/QuestionSetsFilter";
import useQuestionSetsFilter from "@/components/question-sets/useQuestionSetsFilter";
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
	const { getIsVisibilityFiltered } = useQuestionSetsFilter();

	return (
		<div className="flex flex-col gap-gap-11 h-full">
			<QuestionSetsFilter />

			<QuestionSetsCardsLayout isLoading={isLoading}>
				{questionSets
					.filter((questionSet) =>
						questionSet.visibility
							? getIsVisibilityFiltered(questionSet.visibility)
							: false,
					)
					.map((questionSet) => (
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
