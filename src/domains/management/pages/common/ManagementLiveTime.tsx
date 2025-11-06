import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetApiResponse } from "@/libs/types";
import ManagementCreateQuestionButton from "../../components/common/ManagementCreateQuestionButton";
import ManagementLiveTimeCard from "../../components/common/ManagementLiveTimeCard";

//
//
//

interface ManagementLiveTimeProps {
	questionSets: QuestionSetApiResponse[];
}

//
//
//

const ManagementLiveTime = ({ questionSets }: ManagementLiveTimeProps) => {
	return (
		<div className="flex flex-col gap-gap-11">
			<div className="flex justify-between items-center">
				<QuestionSetsLable label="진행중인가" variant="secondary" />

				<ManagementCreateQuestionButton />
			</div>

			<QuestionSetsCardsLayout>
				{questionSets.map((questionSet) => (
					<ManagementLiveTimeCard
						key={questionSet.id}
						questionSet={questionSet}
					/>
				))}
			</QuestionSetsCardsLayout>
		</div>
	);
};

export default ManagementLiveTime;
