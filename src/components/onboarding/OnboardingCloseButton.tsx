import { CircleX } from "lucide-react";
import useOnboarding from "@/hooks/useOnboarding";

//
//
//

const OnboardingCloseButton = () => {
	const { closeOnboarding } = useOnboarding();

	return (
		<button
			type="button"
			onClick={closeOnboarding}
			className="fixed top-5 right-5 z-[62] flex items-center gap-gap-9"
		>
			<div className="flex items-center justify-center size-[42px] rounded-radius-max bg-color-alpha-white50 border border-color-gray-20">
				<CircleX size={20} className="text-color-alpha-white100" />
			</div>
			<span className="typo-heading-medium text-color-alpha-white100 whitespace-nowrap">
				닫기
			</span>
		</button>
	);
};

export default OnboardingCloseButton;
