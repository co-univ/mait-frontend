import { QuestionSetsCard } from "@/components/question-sets/card";
import { notify } from "@/components/Toast";
import ManagementReviewCardVisibilityDropdown from "@/domains/management/components/common/ManagementReviewCardVisibilityDropdown";
import apiHooks from "@/libs/api/hooks";
import type {
	DeliveryMode,
	QuestionSetDto,
	QuestionSetVisibility,
} from "@/libs/types";

//
//
//

interface ManagementReviewCardProps {
	questionSet: QuestionSetDto;
	invalidateQuestionSetsQuery: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
}

//
//
//

const ManagementReviewCard = ({
	questionSet,
	invalidateQuestionSetsQuery,
}: ManagementReviewCardProps) => {
	const currentVisibility = questionSet.visibility ?? "PUBLIC";

	const { mutate } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}/review",
		{
			onSuccess: () => {
				notify.success("문제 셋 공개 범위가 변경되었습니다.");
				invalidateQuestionSetsQuery();
			},
		},
	);

	const handleVisibilityChange = (value: QuestionSetVisibility) => {
		mutate({
			params: {
				path: {
					questionSetId: questionSet.id ?? 0,
				},
			},
			body: {
				visibility: value,
			},
		});
	};

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.subject} />
				<ManagementReviewCardVisibilityDropdown
					currentVisibility={currentVisibility}
					onVisibilityChange={handleVisibilityChange}
				/>
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
			</QuestionSetsCard.Footer>
		</QuestionSetsCard.Root>
	);
};

export default ManagementReviewCard;
