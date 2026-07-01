import { PencilLine } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import OnboardingFinishModal from "@/components/onboarding/OnboardingFinishModal";
import { sonnerNotify } from "@/components/SonnerToast";
import useOnboarding from "@/hooks/useOnboarding";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { apiHooks } from "@/libs/api";
import useOnboardingStore from "@/stores/useOnboardingStore";
import { CONTROL_ROUTE_PATH } from "../../../control.routes";
import useControlSolvingQuestion from "../../../hooks/solving/question/useControlSolvingQuestion";
import useControlSolvingQuestionSet from "../../../hooks/solving/useControlSolvingQuestionSet";
import { useControlSolvingWebSocket } from "../../../hooks/solving/useControlSolvingWebSocket";
import ControlSolvingQuestionNavigation from "../../common/solving/ControlSolvingQuestionNavigation";
import ControlLiveSolvingQuestion from "./question/ControlLiveSolvingQuestion";
import ControlLiveSolvingSubmission from "./submission/ControlLiveSolvingSubmission";

//
//
//

const ControlLiveSolving = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const {
		isFinishModalOpen,
		isUnviewedLoaded,
		startOnboardingForCode,
		reset,
		markCompletedForSession,
	} = useOnboarding();

	const { mutateAsync: postViewRecord } = apiHooks.useMutation(
		"post",
		"/api/v1/onboarding/screens/view",
	);

	const handleFinishConfirm = useCallback(
		async (isDismissed: boolean) => {
			useOnboardingStore.getState().setIsFinishModalOpen(false);

			if (isDismissed) {
				const screenIds = useOnboardingStore.getState().pendingScreenIds;
				await Promise.all(
					screenIds.map((screenId) =>
						postViewRecord({ body: { screenId, dismissed: true } }),
					),
				);
			} else {
				markCompletedForSession("QUESTION_MANAGE_DETAIL");
			}

			reset();
		},
		[postViewRecord, reset, markCompletedForSession],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: run only when isUnviewedLoaded changes
	useEffect(() => {
		if (!isUnviewedLoaded) {
			return;
		}

		startOnboardingForCode("QUESTION_MANAGE_DETAIL");
	}, [isUnviewedLoaded]);


	const { questionSet, handleQuestionSetStart, handleQuestionSetEnd } =
		useControlSolvingQuestionSet({ questionSetId });
	const { question } = useControlSolvingQuestion({
		questionSetId,
		questionId,
	});

	const { connect, disconnect } = useControlSolvingWebSocket({
		questionSetId,
		onMessage: (message) => {
			sonnerNotify.info(`${message.userNickname}님이 실시간 풀이에 입장하였습니다.`);
		},
	});

	/**
	 *
	 */
	const renderQuestionControlButton = () => {
		if (!questionSet) {
			return null;
		}

		const status = questionSet.status;

		switch (status) {
			case "BEFORE": {
				return (
					<Button
						item="시작하기"
						className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
						onClick={handleQuestionSetStart}
					/>
				);
			}
			case "ONGOING": {
				return (
					<Button
						item="종료하기"
						className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
						onClick={handleQuestionSetEnd}
					/>
				);
			}
			case "AFTER": {
				return null;
			}
		}
	};

	// Connect to WebSocket
	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, [connect, disconnect]);

	return (
		<>
			<LabeledPageLayout
				icon={<PencilLine />}
				label="문제 풀이 관리"
				rightContent={renderQuestionControlButton()}
			>
				<div className="flex flex-col gap-gap-11">
					<ControlSolvingQuestionNavigation
						routePath={CONTROL_ROUTE_PATH.LIVE_SOLVING}
					/>
					<div className="flex gap-gap-10 w-full">
						<div className="flex-[2] w-0">
							<ControlLiveSolvingQuestion />
						</div>
						<div className="flex-[3] min-w-0">
							<ControlLiveSolvingSubmission
								questionStatusType={question?.questionStatusType}
							/>
						</div>
					</div>
				</div>
			</LabeledPageLayout>

			{isFinishModalOpen && (
				<OnboardingFinishModal onConfirm={handleFinishConfirm} />
			)}
		</>
	);
};

export default ControlLiveSolving;
