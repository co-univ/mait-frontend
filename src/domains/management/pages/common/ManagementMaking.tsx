import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetApiResponse } from "@/libs/types";
import ManagementMakingCard from "../../components/common/ManagementMakingCard";

//
//
//

interface ManagementMakingProps {
	questionSets: QuestionSetApiResponse[];
}

//
//
//

const ManagementMaking = ({ questionSets }: ManagementMakingProps) => {
	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex justify-between items-center">
				<QuestionSetsLable label="제작 중" />
			</div>

			<QuestionSetsCardsLayout minGridWidth={260}>
				{questionSets.map((questionSet) => (
					<ManagementMakingCard
						key={questionSet.id}
						questionSet={questionSet}
					/>
				))}
			</QuestionSetsCardsLayout>
		</div>
	);
};

export default ManagementMaking;
