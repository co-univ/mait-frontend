import { useCallback, useEffect } from "react";
import OnboardingFinishModal from "@/components/onboarding/OnboardingFinishModal";
import useBreakpoint from "@/hooks/useBreakpoint";
import useOnboarding from "@/hooks/useOnboarding";
import { apiHooks } from "@/libs/api";
import useOnboardingStore from "@/stores/useOnboardingStore";
import HomeSlide from "../../components/common/HomeSlide";
import HomeFirst from "./HomeFirst";
import HomeSecond from "./HomeSecond";
import HomeSecondMobile from "./HomeSecondMobile";
import HomeThird from "./HomeThird";
import HomeThirdMobile from "./HomeThirdMobile";

//
//
//

const Home = () => {
	const { isLg } = useBreakpoint();
	const {
		isFinishModalOpen,
		isUnviewedLoaded,
		startOnboarding,
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
				markCompletedForSession();
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

		startOnboarding();
	}, [isUnviewedLoaded]);

	return (
		<>
			<div
				className="w-full h-screen overflow-y-scroll snap-mandatory snap-y overflow-x-hidden"
				style={{ scrollbarWidth: "none" }}
			>
				{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
				<HomeSlide id="hero">
					<HomeFirst />
				</HomeSlide>
				{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
				<HomeSlide id="guide">
					{isLg && <HomeSecond />}
					{!isLg && <HomeSecondMobile />}
				</HomeSlide>
				{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
				<HomeSlide id="features">
					{isLg && <HomeThird />}
					{!isLg && <HomeThirdMobile />}
				</HomeSlide>
			</div>

			{isFinishModalOpen && (
				<OnboardingFinishModal onConfirm={handleFinishConfirm} />
			)}
		</>
	);
};

export default Home;
