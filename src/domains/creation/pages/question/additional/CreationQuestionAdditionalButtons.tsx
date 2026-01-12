import { Check, LogIn, Save } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";
import {
	useCreationQuestion,
	useCreationQuestions,
} from "@/domains/creation/hooks/question";
import { createPath } from "@/utils/create-path";

//
//
//

const CreationQuestionAdditionalButtons = () => {
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const navigate = useNavigate();

	const { isEditing, handleUpdateQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	const { questions, handleValidateQuestions } = useCreationQuestions({
		questionSetId,
	});

	/**
	 *
	 */
	const handleUpdateButtonClick = async () => {
		const res = await handleUpdateQuestion();
		const newQuestionId = res?.data?.id;

		notify.success("문제가 저장되었습니다.");

		navigate(
			createPath(CREATION_ROUTE_PATH.QUESTION, {
				questionSetId,
				questionId: newQuestionId ?? 0,
			}),
		);
	};

	/**
	 *
	 */
	const handleCreateButtonClick = async () => {
		const isExistEditingQuestion = questions.some(
			(question) => question.isEditing,
		);

		if (isExistEditingQuestion) {
			await handleUpdateQuestion();
		}

		const isValid = await handleValidateQuestions();

		if (!isValid) {
			notify.error("유효하지 않은 문제가 있습니다. 확인해주세요.");
			return;
		}

		navigate(
			createPath(CREATION_ROUTE_PATH.PUBLISH, {
				questionSetId: questionSetId,
			}),
		);
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: timer only depends on isEditing state
	useEffect(() => {
		if (isEditing) {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				handleUpdateButtonClick();
			}, 60 * 1000);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [isEditing]);

	return (
		<div className="flex justify-between">
			<Button
				disabled={!isEditing}
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
