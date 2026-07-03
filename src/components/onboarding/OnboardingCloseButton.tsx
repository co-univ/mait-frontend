import { CircleX } from "lucide-react";
import CheckBox from "@/components/CheckBox";
import useBreakpoint from "@/hooks/useBreakpoint";
import useOnboarding from "@/hooks/useOnboarding";
import useOnboardingStore from "@/stores/useOnboardingStore";

//
//
//

const OnboardingCloseButton = () => {
	const { closeOnboarding, neverShowOnboarding } = useOnboarding();
	const isDismissed = useOnboardingStore((s) => s.isDismissed);
	const setIsDismissed = useOnboardingStore((s) => s.setIsDismissed);
	const { isMobile } = useBreakpoint();

	const handleClose = () => {
		if (isDismissed) {
			neverShowOnboarding();
		} else {
			closeOnboarding();
		}
	};

	return (
		<div className="fixed top-5 right-5 z-[62] flex items-center gap-gap-11">
			<button
				type="button"
				className="flex items-center gap-gap-9"
				onClick={() => setIsDismissed(!isDismissed)}
			>
				<CheckBox
					checked={isDismissed}
					size={isMobile ? 24 : 32}
					onChange={() => {}}
					className="text-color-alpha-white100 pointer-events-none"
				/>
				<span className="typo-heading-small md:typo-heading-medium text-color-alpha-white100 whitespace-nowrap">
					다시 보지 않기
				</span>
			</button>

			<button
				type="button"
				onClick={handleClose}
				className="flex items-center gap-gap-9"
			>
				<div className="flex items-center justify-center size-8 md:size-[42px] rounded-radius-max bg-color-alpha-white50 border border-color-gray-20">
					<CircleX
						size={isMobile ? 16 : 20}
						className="text-color-alpha-white100"
					/>
				</div>
				<span className="typo-heading-small md:typo-heading-medium text-color-alpha-white100 whitespace-nowrap">
					닫기
				</span>
			</button>
		</div>
	);
};

export default OnboardingCloseButton;
