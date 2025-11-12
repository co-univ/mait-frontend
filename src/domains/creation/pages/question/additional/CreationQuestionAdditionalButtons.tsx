import { Check, LogIn, Save } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { useCreationQuestion } from "@/domains/creation/hooks/question";

//
//
//

const CreationQuestionAdditionalButtons = () => {
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const navigate = useNavigate();

	const { isEditing, handleUpdateQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	/**
	 *
	 */
	const handleUpdateButtonClick = async () => {
		const res = await handleUpdateQuestion();
		const questionId = res?.data?.id;

		navigate(
			`/creation/question/team/${teamId}/question-set/${questionSetId}/question/${questionId}`,
		);
	};

	/**
	 *
	 */
	const handleCreateButtonClick = () => {
		navigate(`/creation/publish/team/${teamId}/question-set/${questionSetId}`);
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
