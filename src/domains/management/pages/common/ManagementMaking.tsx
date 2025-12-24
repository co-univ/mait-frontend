import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetDto } from "@/libs/types";
import ManagementCreateQuestionButton from "../../components/common/ManagementCreateQuestionButton";
import ManagementMakingCard from "../../components/common/ManagementMakingCard";

//
//
//

interface ManagementMakingProps {
	questionSets: QuestionSetDto[];
	isLoading: boolean;
}

//
//
//

const ManagementMaking = ({
	questionSets,
	isLoading,
}: ManagementMakingProps) => {
	return (
		<div className="h-full flex flex-col gap-gap-11">
			<div className="flex justify-between items-center">
				<QuestionSetsLable label="제작 중" />
				<ManagementCreateQuestionButton />
			</div>

			<QuestionSetsCardsLayout isLoading={isLoading} minGridWidth={280}>
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
