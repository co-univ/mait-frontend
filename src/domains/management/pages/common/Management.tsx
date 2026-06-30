import { SquarePen } from "lucide-react";
import { useCallback, useEffect } from "react";
import Onboarding from "@/components/onboarding/Onboarding";
import OnboardingFinishModal from "@/components/onboarding/OnboardingFinishModal";
import QuestionSetsTabs from "@/components/question-sets/QuestionSetsTabs";
import { Tabs } from "@/components/tabs";
import useOnboarding from "@/hooks/useOnboarding";
import useQuestionSets from "@/hooks/useQuestionSets";
import useQuestionSetTabMode, {
	type QuestionSetTabMode,
} from "@/hooks/useQuestionSetTabMode";
import useStudyQuestionSets from "@/hooks/useStudyQuestionSets";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { apiHooks } from "@/libs/api";
import useOnboardingStore from "@/stores/useOnboardingStore";
import ManagementCreateQuestionButton from "../../components/common/ManagementCreateQuestionButton";
import ManagementLiveTime from "./ManagementLiveTime";
import ManagementMaking from "./ManagementMaking";
import ManagementReview from "./ManagementReview";
import ManagementStudy from "./ManagementStudy";

//
//
//

const Management = () => {
	const { activeTeam } = useTeams();
	const {
		isActive,
		isFinishModalOpen,
		isUnviewedLoaded,
		currentStepKey,
		nextStep,
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
				markCompletedForSession("QUESTION_MANAGE_SET_LIST");
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

		startOnboardingForCode("QUESTION_MANAGE_SET_LIST");
	}, [isUnviewedLoaded]);

	const validModes = (
		activeTeam?.teamType === "PERSONAL"
			? ["making", "study", "review"]
			: ["making", "live-time", "study", "review"]
	) as QuestionSetTabMode[];

	const { mode, deliveryMode, handleModeChange } = useQuestionSetTabMode(
		validModes,
		"making",
	);

	const {
		questionSetList,
		questionSetGroup,
		invalidateQuestionSetsQuery,
		isLoading,
	} = useQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		mode: deliveryMode,
	});

	const {
		questionSetGroup: studyQuestionSetGroup,
		invalidateQuestionSetsQuery: studyInvalidateQuestionSetsQuery,
		isLoading: studyIsLoading,
	} = useStudyQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		target: "management",
	});

	return (
		<>
			<LabeledPageLayout icon={<SquarePen />} label="문제 관리">
				<Tabs.Root
					value={mode}
					onValueChange={handleModeChange}
					className="flex flex-col gap-gap-11"
				>
					<div className="flex justify-between items-end">
						<QuestionSetsTabs modes={validModes} />
						<Onboarding
							stepKey="new"
							show={isActive && currentStepKey === "new"}
							onNext={nextStep}
						>
							<ManagementCreateQuestionButton />
						</Onboarding>
					</div>

					{validModes.includes("making") && (
						<Tabs.Content value="making">
							<ManagementMaking
								questionSets={questionSetList ?? []}
								invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
								isLoading={isLoading}
							/>
						</Tabs.Content>
					)}

					{validModes.includes("live-time") && (
						<Tabs.Content value="live-time">
							<ManagementLiveTime
								questionSetGroup={questionSetGroup}
								invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
								isLoading={isLoading}
							/>
						</Tabs.Content>
					)}

					{validModes.includes("study") && (
						<Tabs.Content value="study">
							<ManagementStudy
								questionSetGroup={studyQuestionSetGroup}
								invalidateQuestionSetsQuery={studyInvalidateQuestionSetsQuery}
								isLoading={studyIsLoading}
							/>
						</Tabs.Content>
					)}

					{validModes.includes("review") && (
						<Tabs.Content value="review">
							<ManagementReview
								questionSets={questionSetList ?? []}
								invalidateQuestionSetsQuery={invalidateQuestionSetsQuery}
								isLoading={isLoading}
							/>
						</Tabs.Content>
					)}
				</Tabs.Root>
			</LabeledPageLayout>

			{isFinishModalOpen && (
				<OnboardingFinishModal onConfirm={handleFinishConfirm} />
			)}
		</>
	);
};

export default Management;
