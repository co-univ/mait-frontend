import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import Onboarding from "@/components/onboarding/Onboarding";
import { CONTROL_ROUTE_PATH } from "@/domains/control/control.routes";
import ControlSolvingSubmissionPanel from "@/domains/control/pages/common/solving/submission/ControlSolvingSubmissionPanel";
import useOnboarding from "@/hooks/useOnboarding";
import { apiHooks } from "@/libs/api";
import type { UpdateQuestionStatusApiRequest } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import ControlLiveSolvingSubmissionScorerSideDialog from "./ControlLiveSolvingSubmissionScorerSideDialog";

//
//
//

interface ControlLiveSolvingSubmissionProps {
	questionStatusType?: UpdateQuestionStatusApiRequest["statusType"];
}

const SUBMIT_RECORDS_POLLING_INTERVAL = 5000;

//
//
//

const ControlLiveSolvingSubmission = ({
	questionStatusType,
}: ControlLiveSolvingSubmissionProps) => {
	const [isScorerDialogOpen, setIsScorerDialogOpen] = useState(false);

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { isActive, currentStepKey, nextStep } = useOnboarding();

	const { data: scorerData } = apiHooks.useQuery(
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
		{
			retry: false,
			refetchInterval: () => {
				if (questionStatusType === "SOLVE_PERMISSION") {
					return SUBMIT_RECORDS_POLLING_INTERVAL;
				}

				return false;
			},
		},
	);

	const scorer = scorerData?.data;

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleScorerDialogOpen = () => {
		setIsScorerDialogOpen(true);
	};

	/**
	 *
	 */
	const handleScorerDialogClose = () => {
		setIsScorerDialogOpen(false);
	};

	/**
	 *
	 */
	const handlePariticipantButtonClick = () => {
		navigate(
			createPath(CONTROL_ROUTE_PATH.LIVE_PARTICIPANT, {
				questionSetId,
				questionId,
			}),
		);
	};

	const liveHeader = (
		<div className="flex justify-between items-start">
			<div className="flex flex-col">
				<h3 className="typo-body-medium text-color-gray-40">득점자</h3>
				<h2 className="typo-heading-medium">{scorer?.userName}</h2>
			</div>
			<div className="flex gap-gap-5">
				<Onboarding
					stepKey="scorer"
					show={isActive && currentStepKey === "scorer"}
					onNext={nextStep}
				>
					<Button
						item="문제별 득점자"
						className="bg-color-primary-5 typo-body-small text-color-primary-50 border-none"
						onClick={handleScorerDialogOpen}
					/>
				</Onboarding>
				<Onboarding
					stepKey="winner"
					show={isActive && currentStepKey === "winner"}
					onNext={nextStep}
				>
					<Button
						item="진출자/우승자 관리"
						className="bg-color-primary-5 typo-body-small text-color-primary-50 border-none"
						onClick={handlePariticipantButtonClick}
					/>
				</Onboarding>
			</div>
		</div>
	);

	const pollingInterval =
		questionStatusType === "SOLVE_PERMISSION"
			? SUBMIT_RECORDS_POLLING_INTERVAL
			: false;

	return (
		<>
			<ControlSolvingSubmissionPanel
				headerContent={liveHeader}
				pollingInterval={pollingInterval}
			/>
			<ControlLiveSolvingSubmissionScorerSideDialog
				open={isScorerDialogOpen}
				onClose={handleScorerDialogClose}
			/>
		</>
	);
};

export default ControlLiveSolvingSubmission;
