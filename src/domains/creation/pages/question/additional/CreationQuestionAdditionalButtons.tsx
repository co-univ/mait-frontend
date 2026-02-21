import { Check, LogIn, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import useCreationQuestion from "@/domains/creation/hooks/question/_useCreationQuestion";
import useCreationQuestionSet from "@/domains/creation/hooks/question/_useCreationQuestionSet";
import { createPath } from "@/utils/create-path";

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
		<div className="flex justify-between">
			<Button
				disabled={!isDirty}
				icon={<Save />}
				onClick={handleUpdateButtonClick}
				className="bg-color-gray-5 border-none disabled:text-color-gray-20"
			/>
			<Button
				disabled
				icon={<LogIn className="rotate-90" />}
				className="bg-color-primary-5 border-none text-color-primary-50 disabled:text-color-primary-20"
			/>
			<Button
				icon={<Check />}
				item="생성하기"
				onClick={handleCreateButtonClick}
				className="bg-color-primary-5 border-none text-color-primary-50"
			/>
		</div>
	);
};

export default CreationQuestionAdditionalButtons;
