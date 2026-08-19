import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { DeliveryMode, QuestionSetGroup } from "@/libs/types";
import ManagementStudyCard from "../../components/common/ManagementStudyCard";

//
//
//

interface ManagementStudyProps {
	questionSetGroup?: QuestionSetGroup["questionSets"];
	invalidateQuestionSetsQuery: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
	isLoading: boolean;
}

//
//
//

const ManagementStudy = ({
	questionSetGroup,
	invalidateQuestionSetsQuery,
	isLoading,
}: ManagementStudyProps) => {
	const ongoingQuestionSets = questionSetGroup?.ONGOING ?? [];
	const beforeQuestionSets = questionSetGroup?.BEFORE ?? [];
	const afterQuestionSets = questionSetGroup?.AFTER ?? [];

	const hasOngoingQuestionSets = ongoingQuestionSets.length > 0;
	const hasBeforeQuestionSets = beforeQuestionSets.length > 0;
	const hasAfterQuestionSets = afterQuestionSets.length > 0;
	const hasAnyQuestionSets =
		hasOngoingQuestionSets || hasBeforeQuestionSets || hasAfterQuestionSets;

	if (isLoading) {
		return null;
	}

	if (!hasAnyQuestionSets) {
		return <QuestionSetsCardsLayout isLoading={false} />;
	}

	return (
		<div className="h-full flex flex-col gap-gap-11">
			{hasOngoingQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<QuestionSetsLable label="풀이 중" variant="secondary" />

					<QuestionSetsCardsLayout isLoading={false}>
						{ongoingQuestionSets.map((questionSet) => (
							<ManagementStudyCard
								key={questionSet.id}
								questionSet={questionSet}
								invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}

			{hasBeforeQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<QuestionSetsLable label="풀이 전" variant="secondary" />

					<QuestionSetsCardsLayout isLoading={false}>
						{beforeQuestionSets.map((questionSet) => (
							<ManagementStudyCard
								key={questionSet.id}
								questionSet={questionSet}
								invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}

			{hasAfterQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<QuestionSetsLable label="풀이 완료" variant="secondary" />

					<QuestionSetsCardsLayout isLoading={false}>
						{afterQuestionSets.map((questionSet) => (
							<ManagementStudyCard
								key={questionSet.id}
								questionSet={questionSet}
								invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}
		</div>
	);
};

export default ManagementStudy;
