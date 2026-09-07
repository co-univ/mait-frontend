import { useNavigate } from "react-router-dom";
import { QuestionSetsCard } from "@/components/question-sets/card";
import { QuestionSetCardAdditionalButton } from "@/components/question-sets/card-additional-button";
import useQuestionSetCopyModal from "@/components/question-sets/useQuestionSetCopyModal";
// TEMP: backend removed the question-set visibility API; dropdown disabled, kept for when it returns.
// import { notify } from "@/components/Toast";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
// import ManagementReviewCardVisibilityDropdown from "@/domains/management/components/common/ManagementReviewCardVisibilityDropdown";
// import apiHooks from "@/libs/api/hooks";
import type { DeliveryMode, QuestionSetDto } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import useManagementDeleteQuestionSet from "../../hooks/useManagementDeleteQuestionSet";

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
	const navigate = useNavigate();

	// TEMP: backend removed the question-set visibility API; mutation disabled, kept for when it returns.
	// const currentVisibility = questionSet.visibility ?? "PUBLIC";
	//
	// const { mutate } = apiHooks.useMutation(
	// 	"patch",
	// 	"/api/v1/question-sets/{questionSetId}/review",
	// 	{
	// 		onSuccess: () => {
	// 			notify.success("문제 셋 공개 범위가 변경되었습니다.");
	// 			invalidateQuestionSetsQuery();
	// 		},
	// 	},
	// );

	const { copyModal, handleCopyButtonClick } = useQuestionSetCopyModal({
		questionSetId: questionSet.id ?? 0,
		questionSetTitle: questionSet.title,
	});

	const { handleDeleteButtonClick } = useManagementDeleteQuestionSet({
		questionSetId: questionSet.id ?? 0,
		invalidateQuestionSetsQuery,
	});

	/**
	 *
	 */
	const handleControlButtonClick = () => {
		const controlRoutePath =
			questionSet.solveMode === "STUDY"
				? CONTROL_ROUTE_PATH.STUDY_ROOT
				: CONTROL_ROUTE_PATH.LIVE_ROOT;

		navigate(
			createPath(controlRoutePath, {
				questionSetId: questionSet.id ?? 0,
			}),
		);
	};

	// TEMP: backend removed the question-set visibility API; handler disabled, kept for when it returns.
	// const handleVisibilityChange = (value: QuestionSetVisibility) => {
	// 	mutate({
	// 		params: {
	// 			path: {
	// 				questionSetId: questionSet.id ?? 0,
	// 			},
	// 		},
	// 		body: {
	// 			visibility: value,
	// 		},
	// 	});
	// };

	return (
		<QuestionSetsCard.Root>
			<QuestionSetsCard.Header>
				<QuestionSetsCard.Header.Title title={questionSet.title} />
				<QuestionSetCardAdditionalButton
					status="REVIEW"
					onControl={handleControlButtonClick}
					onCopy={handleCopyButtonClick}
					onDelete={handleDeleteButtonClick}
				/>
			</QuestionSetsCard.Header>

			<QuestionSetsCard.Footer>
				<QuestionSetsCard.Footer.Date date={questionSet.updatedAt} />
				{/* TEMP: backend removed the question-set visibility API; dropdown disabled, kept for when it returns.
				<ManagementReviewCardVisibilityDropdown
					currentVisibility={currentVisibility}
					onVisibilityChange={handleVisibilityChange}
				/>
				*/}
			</QuestionSetsCard.Footer>

			{copyModal}
		</QuestionSetsCard.Root>
	);
};

export default ManagementReviewCard;
