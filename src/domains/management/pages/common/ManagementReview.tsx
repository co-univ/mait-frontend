import QuestionSetsFilter from "@/components/question-sets/QuestionSetsFilter";
import useQuestionSetsFilter from "@/components/question-sets/useQuestionSetsFilter";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetDto } from "@/libs/types";
import ManagementReviewCard from "../../components/common/ManagementReviewCard";

//
//
//

interface ManagementReviewProps {
	questionSets: QuestionSetDto[];
	isLoading: boolean;
}

//
//
//

const ManagementReview = ({
	questionSets,
	isLoading,
}: ManagementReviewProps) => {
	const { getIsVisibilityFiltered } = useQuestionSetsFilter();

	return (
		<div className="h-full flex flex-col gap-gap-11">
			<QuestionSetsFilter />

			<QuestionSetsCardsLayout isLoading={isLoading}>
				{questionSets
					.filter((questionSet) =>
						questionSet.visibility
							? getIsVisibilityFiltered(questionSet.visibility)
							: false,
					)
					.map((questionSet) => (
						<ManagementReviewCard
							key={questionSet.id}
							questionSet={questionSet}
						/>
					))}
			</QuestionSetsCardsLayout>
		</div>
	);
};

export default ManagementReview;
