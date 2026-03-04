import { Check, Eye, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import useCreationQuestion from "@/domains/creation/hooks/question/useCreationQuestion";
import useCreationQuestionSet from "@/domains/creation/hooks/question/useCreationQuestionSet";
import { createPath } from "@/utils/create-path";
import CreationQuestionPreviewModal from "../preview/CreationQuestionPreviewModal";

//
//
//

interface CreationQuestionAdditionalButtonsProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionAdditionalButtons = ({
	questionSetId,
	questionId,
}: CreationQuestionAdditionalButtonsProps) => {
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

	const navigate = useNavigate();

	const { validateQuestions } = useCreationQuestionSet({
		questionSetId,
	});

	const { saveQuestion, isDirty } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const handleUpdateButtonClick = async () => {
		const updatResult = await saveQuestion();

		if (updatResult?.isSuccess) {
			notify.success("문제가 저장되었습니다.");

			const updatedQuestionId = updatResult?.data?.id;

			if (updatedQuestionId && updatedQuestionId !== questionId) {
				navigate(
					createPath(CREATION_ROUTE_PATH.QUESTION, {
						questionSetId,
						questionId: updatedQuestionId,
					}),
					{
						replace: true,
					},
				);
			}
		}
	};

	/**
	 *
	 */
	const handleCreateButtonClick = async () => {
		if (isDirty) {
			const updateResult = await saveQuestion();

			const newQuestionId = updateResult?.data?.id;

			if (newQuestionId && newQuestionId !== questionId) {
				navigate(
					createPath(CREATION_ROUTE_PATH.QUESTION, {
						questionSetId,
						questionId: newQuestionId,
					}),
					{
						replace: true,
					},
				);
			}
		}

		const isValid = await validateQuestions();

		if (isValid) {
			navigate(
				createPath(CREATION_ROUTE_PATH.PUBLISH, {
					questionSetId: questionSetId,
				}),
			);
		}
	};

	return (
		<>
			<div className="flex justify-between">
				<Button
					disabled={!isDirty}
					icon={<Save />}
					onClick={handleUpdateButtonClick}
					className="bg-color-gray-5 border-none disabled:text-color-gray-20"
				/>
				<Button
					icon={<Eye />}
					onClick={() => setIsPreviewModalOpen(true)}
					className="bg-color-primary-5 border-none"
				/>
				<Button
					icon={<Check />}
					item="생성하기"
					onClick={handleCreateButtonClick}
					className="bg-color-primary-5 border-none text-color-primary-50"
				/>
			</div>

			<CreationQuestionPreviewModal
				open={isPreviewModalOpen}
				questionSetId={questionSetId}
				questionId={questionId}
				onClose={() => setIsPreviewModalOpen(false)}
			/>
		</>
	);
};

export default CreationQuestionAdditionalButtons;
