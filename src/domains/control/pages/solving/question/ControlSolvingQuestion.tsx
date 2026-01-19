import { useQueryClient } from "@tanstack/react-query";
import { Check, Pencil, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import { Switch } from "@/components/switch/Switch";
import Tooltip from "@/components/Tooltip";
import ControlSolvingQuestionContent from "@/domains/control/components/solving/question/ControlSolvingQuestionContent";
import useControlSolvingQuestion from "@/domains/control/hooks/solving/question/useControlSolvingQuestion";
import { apiHooks } from "@/libs/api";
import type {
	QuestionApiResponse,
	QuestionSetApiResponse,
	QuestionType,
} from "@/libs/types";
import ControlSolvingQuestionFillBlank from "./ControlSolvingQuestionFillBlank";
import ControlSolvingQuestionMultiple from "./ControlSolvingQuestionMultiple";
import ControlSolvingQuestionOrdering from "./ControlSolvingQuestionOrdering";
import ControlSolvingQuestionShort from "./ControlSolvingQuestionShort";

//
//
//

interface ControlSolvingQuestionProps {
	questionSetOngoingStatus?: QuestionSetApiResponse["ongoingStatus"];
}

const QUESTION_POLLING_INTERVAL = 10000;

//
//
//

const ControlSolvingQuestion = ({
	questionSetOngoingStatus,
}: ControlSolvingQuestionProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [updateStatusType, setUpdateStatusType] = useState<
		"ACCESS" | "SOLVE" | null
	>(null);
	const [submitHandler, setSubmitHandler] = useState<
		(() => Promise<boolean>) | null
	>(null);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		isStatusUpdating,
		question,
		refetchQuestion,
		handleAccessOpen,
		handleAccessClose,
		handleSolveOpen,
		handleSolveClose,
	} = useControlSolvingQuestion({
		questionSetId,
		questionId,
		refetchInterval:
			questionSetOngoingStatus === "ONGOING"
				? QUESTION_POLLING_INTERVAL
				: undefined,
	});

	const queryClient = useQueryClient();

	/**
	 *
	 */
	const handleRegisterSubmit = useCallback(
		(handler: () => Promise<boolean>) => {
			setSubmitHandler(() => handler);
		},
		[],
	);

	/**
	 *
	 */
	const handleEditButtonClick = () => {
		setIsEditing(true);
	};

	/**
	 *
	 */
	const handleCancelButtonClick = () => {
		setIsEditing(false);
		refetchQuestion();
	};

	/**
	 *
	 */
	const handleCompleteButtonClick = async () => {
		const res = await submitHandler?.();

		if (res) {
			setIsEditing(false);

			queryClient.invalidateQueries({
				queryKey: apiHooks.queryOptions(
					"get",
					"/api/v1/question-sets/{questionSetId}/questions/{questionId}/scorers",
					{
						params: {
							path: {
								questionSetId,
								questionId,
							},
						},
					},
				).queryKey,
			});

			queryClient.invalidateQueries({
				queryKey: apiHooks.queryOptions(
					"get",
					"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit-records",
					{
						params: {
							path: {
								questionSetId,
								questionId,
							},
						},
					},
				).queryKey,
			});
		}
	};

	/**
	 *
	 */
	const handleAccessSwitchChange = (checked: boolean) => {
		setUpdateStatusType("ACCESS");

		if (checked) {
			handleAccessOpen();
		} else {
			handleAccessClose();
		}
	};

	/**
	 *
	 */
	const handleSolveSwitchChange = (checked: boolean) => {
		setUpdateStatusType("SOLVE");

		if (checked) {
			handleSolveOpen();
		} else {
			handleSolveClose();
		}
	};

	/**
	 *
	 */
	const renderQuestionControlButtons = () => {
		const allowedAccessTypes: QuestionApiResponse["questionStatusType"][] = [
			"ACCESS_PERMISSION",
			"SOLVE_PERMISSION",
		];
		const allowedSolveType: QuestionApiResponse["questionStatusType"][] = [
			"SOLVE_PERMISSION",
		];

		const isSolveSwitchLoading =
			updateStatusType === "SOLVE" &&
			!allowedSolveType.includes(question?.questionStatusType) &&
			isStatusUpdating;

		return (
			<div className="flex gap-gap-9">
				<Switch.Root
					checked={allowedAccessTypes.includes(question?.questionStatusType)}
					onChange={handleAccessSwitchChange}
				>
					<Switch.Label>문제 공개</Switch.Label>
					<Switch.Toggle />
				</Switch.Root>
				<Switch.Root
					checked={allowedSolveType.includes(question?.questionStatusType)}
					loading={isSolveSwitchLoading}
					onChange={handleSolveSwitchChange}
				>
					<Switch.Label>제출 허용</Switch.Label>
					<Tooltip
						open={isSolveSwitchLoading}
						message="제출 허용은 5초 이내에 활성화됩니다."
						variant="primary"
					>
						<Switch.Toggle />
					</Tooltip>
				</Switch.Root>
			</div>
		);
	};

	/**
	 *
	 */
	const renderCancelButton = () => {
		if (!isEditing) {
			return null;
		}

		return (
			<Button
				icon={<X />}
				onClick={handleCancelButtonClick}
				className="border-none"
			/>
		);
	};

	/**
	 *
	 */
	const renderEditButton = () => {
		if (isEditing) {
			return (
				<Button
					icon={<Check />}
					item="수정 완료"
					onClick={handleCompleteButtonClick}
				/>
			);
		}

		return <Button icon={<Pencil />} onClick={handleEditButtonClick} />;
	};

	/**
	 *
	 */
	const renderQuestionContent = () => {
		return (
			<ControlSolvingQuestionContent
				content={question?.content}
				imgUrl={question?.imageUrl}
			/>
		);
	};

	/**
	 *
	 */
	const renderQuestionAnswer = () => {
		switch (question?.type as QuestionType) {
			case "MULTIPLE":
				return (
					<ControlSolvingQuestionMultiple
						readOnly={!isEditing}
						onRegisterSubmit={handleRegisterSubmit}
					/>
				);
			case "SHORT":
				return (
					<ControlSolvingQuestionShort
						readOnly={!isEditing}
						onRegisterSubmit={handleRegisterSubmit}
					/>
				);
			case "ORDERING":
				return (
					<ControlSolvingQuestionOrdering
						readOnly={!isEditing}
						onRegisterSubmit={handleRegisterSubmit}
					/>
				);
			case "FILL_BLANK":
				return (
					<ControlSolvingQuestionFillBlank
						readOnly={!isEditing}
						onRegisterSubmit={handleRegisterSubmit}
					/>
				);
			default:
				return null;
		}
	};

	//
	//
	//
	useEffect(() => {
		if (!isStatusUpdating) {
			setUpdateStatusType(null);
		}
	}, [isStatusUpdating]);

	return (
		<div className="flex flex-col gap-gap-11 min-w-0">
			<div className="flex justify-between">
				{isEditing ? renderCancelButton() : renderQuestionControlButtons()}
				{renderEditButton()}
			</div>
			{renderQuestionContent()}
			{renderQuestionAnswer()}
		</div>
	);
};

export default ControlSolvingQuestion;
