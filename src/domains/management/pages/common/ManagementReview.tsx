import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetDto } from "@/libs/types";
import ManagementReviewCard from "../../components/common/ManagementReviewCard";

//
//
//

interface ManagementReviewProps {
	questionSets: QuestionSetDto[];
}

//
//
//

const ManagementReview = ({ questionSets }: ManagementReviewProps) => {
	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex justify-between items-center">
				{/*
				 *
				 */}
			</div>

			<QuestionSetsCardsLayout>
				{questionSets.map((questionSet) => (
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
