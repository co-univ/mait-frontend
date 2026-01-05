import { useState } from "react";
import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { DeliveryMode, QuestionSetGroup } from "@/libs/types";
import ManagementCreateQuestionButton from "../../components/common/ManagementCreateQuestionButton";
import ManagementLiveTimeCard from "../../components/common/ManagementLiveTimeCard";
import ManagementReviewStatusModal from "../../components/common/ManagementReviewStatusModal";

//
//
//

interface ManagementLiveTimeProps {
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

const ManagementLiveTime = ({
	questionSetGroup,
	invalidateQuestionSetsQuery,
	isLoading,
}: ManagementLiveTimeProps) => {
	const [reviewStatusModalOpen, setReviewStatusModalOpen] = useState(false);
	const [selectedQuestionSetId, setSelectedQuestionSetId] = useState<
		number | null
	>(null);

	const ongoingQuestionSets = questionSetGroup?.ONGOING ?? [];
	const beforeQuestionSets = questionSetGroup?.BEFORE ?? [];
	const afterQuestionSets = questionSetGroup?.AFTER ?? [];

	const hasOngoingQuestionSets = ongoingQuestionSets.length > 0;
	const hasBeforeQuestionSets = beforeQuestionSets.length > 0;
	const hasAfterQuestionSets = afterQuestionSets.length > 0;
	const hasAnyQuestionSets =
		hasOngoingQuestionSets || hasBeforeQuestionSets || hasAfterQuestionSets;

	/**
	 *
	 */
	const handleReviewStatusModalOpen = (questionSetId: number) => {
		setReviewStatusModalOpen(true);
		setSelectedQuestionSetId(questionSetId);
	};

	/**
	 *
	 */
	const handleReviewStatusModalClose = () => {
		setReviewStatusModalOpen(false);
		setSelectedQuestionSetId(null);
	};

	if (isLoading) {
		return null;
	}

	if (!hasAnyQuestionSets) {
		return <QuestionSetsCardsLayout isLoading={false} />;
	}

	return (
		<>
			<div className="h-full flex flex-col gap-gap-11">
				{hasOngoingQuestionSets && (
					<div className="flex flex-col gap-gap-11">
						<div className="flex justify-between items-center">
							<QuestionSetsLable label="풀이 중" variant="secondary" />
							<ManagementCreateQuestionButton />
						</div>
						<QuestionSetsCardsLayout isLoading={false}>
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
							<QuestionSetsLable label="풀이 전" variant="secondary" />

							{!hasOngoingQuestionSets && <ManagementCreateQuestionButton />}
						</div>
						<QuestionSetsCardsLayout isLoading={false}>
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
							<QuestionSetsLable label="풀이 완료" variant="secondary" />

							{!hasOngoingQuestionSets && !hasBeforeQuestionSets && (
								<ManagementCreateQuestionButton />
							)}
						</div>
						<QuestionSetsCardsLayout isLoading={false}>
							{afterQuestionSets.map((questionSet) => (
								<ManagementLiveTimeCard
									key={questionSet.id}
									questionSet={questionSet}
									onReviewStatusModalOpen={handleReviewStatusModalOpen}
									invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
								/>
							))}
						</QuestionSetsCardsLayout>
					</div>
				)}
			</div>
			<ManagementReviewStatusModal
				open={reviewStatusModalOpen}
				questionSetId={selectedQuestionSetId}
				onClose={handleReviewStatusModalClose}
				invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
			/>
		</>
	);
};

export default ManagementLiveTime;
