import { useState } from "react";
import QuestionSetCopyModal from "@/components/question-sets/QuestionSetCopyModal";
import type { QuestionSetSolveMode } from "@/libs/types";

//
//
//

interface UseQuestionSetCopyModalParams {
	questionSetId: number;
	questionSetTitle?: string;
	solveMode?: QuestionSetSolveMode;
}

//
//
//

/**
 * Bundles the copy modal with its open state so a card only has to render
 * `copyModal` and hand `handleCopyButtonClick` to the additional button.
 */
const useQuestionSetCopyModal = ({
	questionSetId,
	questionSetTitle,
	solveMode,
}: UseQuestionSetCopyModalParams) => {
	const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

	/**
	 *
	 */
	const handleCopyButtonClick = () => {
		setIsCopyModalOpen(true);
	};

	const copyModal = (
		<QuestionSetCopyModal
			open={isCopyModalOpen}
			questionSetId={questionSetId}
			questionSetTitle={questionSetTitle}
			solveMode={solveMode}
			onClose={() => setIsCopyModalOpen(false)}
		/>
	);

	return {
		copyModal,
		handleCopyButtonClick,
	};
};

export default useQuestionSetCopyModal;
