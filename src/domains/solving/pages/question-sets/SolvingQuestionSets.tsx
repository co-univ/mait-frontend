import { SquarePen } from "lucide-react";
import { useCallback, useEffect } from "react";
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
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import SolvingQuestionSetsLiveTime from "./SolvingQuestionSetsLiveTime";
import SolvingQuestionSetsReview from "./SolvingQuestionSetsReview";
import SolvingQuestionSetsStudy from "./SolvingQuestionSetsStudy";

//
//
//

const SolvingQuestionSets = () => {
	const { activeTeam } = useTeams();
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
				markCompletedForSession("QUESTION_SOLVE_SET_LIST");
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

		startOnboardingForCode("QUESTION_SOLVE_SET_LIST");
	}, [isUnviewedLoaded]);

	const validModes = (
		activeTeam?.teamType === "PERSONAL"
			? ["study", "review"]
			: ["live-time", "study", "review"]
	) as QuestionSetTabMode[];

	const { mode, deliveryMode, handleModeChange } = useQuestionSetTabMode(
		validModes,
		validModes.includes("live-time") ? "live-time" : "study",
	);

	const { questionSetList, questionSetGroup, isLoading } = useQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		mode: deliveryMode,
	});

	const { questionSetGroup: studyQuestionSetGroup, isLoading: studyIsLoading } =
		useStudyQuestionSets({
			teamId: activeTeam?.teamId ?? 0,
			target: "progress",
		});

	//
	useEffect(() => {
		if (mode !== "live-time") {
			return;
		}

		trackEvent(GTM_EVENT_NAMES.solvingLiveTabView, {
			entry_source: "solving_question_sets",
			mode: "live_time",
		});
	}, [mode]);

	return (
		<>
			<LabeledPageLayout icon={<SquarePen />} label="문제 풀기">
				<Tabs.Root
					value={mode}
					onValueChange={handleModeChange}
					className="flex flex-col gap-gap-11"
				>
					<QuestionSetsTabs modes={validModes} />
					{validModes.includes("live-time") && (
						<Tabs.Content value="live-time">
							<SolvingQuestionSetsLiveTime
								questionSetGroup={questionSetGroup}
								isLoading={isLoading}
							/>
						</Tabs.Content>
					)}

					{validModes.includes("study") && (
						<Tabs.Content value="study">
							<SolvingQuestionSetsStudy
								questionSetGroup={studyQuestionSetGroup}
								isLoading={studyIsLoading}
							/>
						</Tabs.Content>
					)}

					{validModes.includes("review") && (
						<Tabs.Content value="review" className="h-full">
							<SolvingQuestionSetsReview
								questionSets={questionSetList ?? []}
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

export default SolvingQuestionSets;
