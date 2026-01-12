import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { DeliveryMode, QuestionSetDto } from "@/libs/types";
import ManagementMakingCard from "../../components/common/ManagementMakingCard";

//
//
//

interface ManagementMakingProps {
	questionSets: QuestionSetDto[];
	invalidateQuestionSetsQuery: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
	isLoading: boolean;
}

//
//
//

const ManagementMaking = ({
	questionSets,
	invalidateQuestionSetsQuery,
	isLoading,
}: ManagementMakingProps) => {
	return (
		<div className="h-full flex flex-col gap-gap-11">
			<QuestionSetsLable label="제작 중" />

			<QuestionSetsCardsLayout isLoading={isLoading} minGridWidth={280}>
				{questionSets.map((questionSet) => (
					<ManagementMakingCard
						key={questionSet.id}
						questionSet={questionSet}
						invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
					/>
				))}
			</QuestionSetsCardsLayout>
		</div>
	);
};

export default ManagementMaking;
