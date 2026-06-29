import { useCallback, useEffect } from "react";
import { useConfirm } from "@/components/confirm";
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
	const { confirm } = useConfirm();
	const { isFinishModalOpen, isUnviewedLoaded, startOnboarding, reset } =
		useOnboarding();

	const { mutateAsync: postViewRecord } = apiHooks.useMutation(
		"post",
		"/api/v1/onboarding/screens/view",
	);

	const handleFinishConfirm = useCallback(async () => {
		useOnboardingStore.getState().setIsFinishModalOpen(false);

		const screenIds = useOnboardingStore.getState().pendingScreenIds;

		const isDismissed = await confirm({
			title: "온보딩이 완료되었습니다! 이제 MAIT 서비스를 시작해 보세요.",
			description:
				"필요하신 경우 설정에서 온보딩을 다시 확인할 수 있으며, '다시 보지 않기'를 선택하면 다음부터는 표시되지 않습니다.",
			cancelText: "다시 보지 않기",
			confirmText: "시작하기",
		});

		if (!isDismissed) {
			await Promise.all(
				screenIds.map((screenId) =>
					postViewRecord({ body: { screenId, dismissed: true } }),
				),
			);
		}

		reset();
	}, [confirm, postViewRecord, reset]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: run only when isUnviewedLoaded changes
	useEffect(() => {
		if (!isUnviewedLoaded) {
			return;
		}

		startOnboarding();
	}, [isUnviewedLoaded]);

	//
	useEffect(() => {
		if (!isFinishModalOpen) {
			return;
		}

		handleFinishConfirm();
	}, [isFinishModalOpen, handleFinishConfirm]);

	return (
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
	);
};

export default Home;
