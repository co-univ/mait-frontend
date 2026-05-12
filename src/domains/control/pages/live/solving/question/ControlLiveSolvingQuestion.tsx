import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Switch } from "@/components/switch/Switch";
import Tooltip from "@/components/Tooltip";
import useControlLiveSolvingQuestion from "@/domains/control/hooks/solving/question/useControlLiveSolvingQuestion";
import ControlSolvingQuestionPanel from "@/domains/control/pages/common/solving/question/ControlSolvingQuestionPanel";
import type { QuestionApiResponse } from "@/libs/types";

//
//
//

const ControlLiveSolvingQuestion = () => {
	const [updateStatusType, setUpdateStatusType] = useState<
		"ACCESS" | "SOLVE" | null
	>(null);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		isStatusUpdating,
		question,
		handleAccessOpen,
		handleAccessClose,
		handleSolveOpen,
		handleSolveClose,
	} = useControlLiveSolvingQuestion({
		questionSetId,
		questionId,
	});

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

	//
	//
	//
	useEffect(() => {
		if (!isStatusUpdating) {
			setUpdateStatusType(null);
		}
	}, [isStatusUpdating]);

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

	const liveControls = (
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

	return <ControlSolvingQuestionPanel topControls={liveControls} />;
};

export default ControlLiveSolvingQuestion;
