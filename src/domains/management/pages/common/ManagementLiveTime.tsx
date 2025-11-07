import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetGroup } from "@/libs/types";
import ManagementCreateQuestionButton from "../../components/common/ManagementCreateQuestionButton";
import ManagementLiveTimeCard from "../../components/common/ManagementLiveTimeCard";

//
//
//

interface ManagementLiveTimeProps {
	questionSetGroup?: QuestionSetGroup["questionSets"];
}

//
//
//

const ManagementLiveTime = ({ questionSetGroup }: ManagementLiveTimeProps) => {
	const ongoingQuestionSets = questionSetGroup?.ONGOING ?? [];
	const beforeQuestionSets = questionSetGroup?.BEFORE ?? [];
	const afterQuestionSets = questionSetGroup?.AFTER ?? [];

	const hasOngoingQuestionSets = ongoingQuestionSets.length > 0;
	const hasBeforeQuestionSets = beforeQuestionSets.length > 0;
	const hasAfterQuestionSets = afterQuestionSets.length > 0;

	return (
		<div className="flex flex-col gap-gap-11">
			{hasOngoingQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<div className="flex justify-between items-center">
						<QuestionSetsLable label="진행중" variant="secondary" />
						<ManagementCreateQuestionButton />
					</div>
					<QuestionSetsCardsLayout>
						{ongoingQuestionSets.map((questionSet) => (
							<ManagementLiveTimeCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}

			{hasBeforeQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<div className="flex justify-between items-center">
						<QuestionSetsLable label="진행 예정" variant="secondary" />

						{!hasOngoingQuestionSets && <ManagementCreateQuestionButton />}
					</div>
					<QuestionSetsCardsLayout>
						{beforeQuestionSets.map((questionSet) => (
							<ManagementLiveTimeCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}

			{hasAfterQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<div className="flex justify-between items-center">
						<QuestionSetsLable label="종료" variant="secondary" />

						{!hasOngoingQuestionSets && !hasBeforeQuestionSets && (
							<ManagementCreateQuestionButton />
						)}
					</div>
					<QuestionSetsCardsLayout>
						{afterQuestionSets.map((questionSet) => (
							<ManagementLiveTimeCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}
		</div>
	);
};

export default ManagementLiveTime;
