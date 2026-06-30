import { CircleX } from "lucide-react";
import { useState } from "react";
import CheckBox from "@/components/CheckBox";
import useOnboarding from "@/hooks/useOnboarding";

//
//
//

const OnboardingCloseButton = () => {
	const { closeOnboarding, neverShowOnboarding } = useOnboarding();
	const [neverShow, setNeverShow] = useState(false);

	const handleClose = () => {
		if (neverShow) {
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
				onClick={() => setNeverShow((prev) => !prev)}
			>
				<CheckBox
					checked={neverShow}
					size={32}
					onChange={() => {}}
					className="text-color-alpha-white100 pointer-events-none"
				/>
				<span className="typo-heading-medium text-color-alpha-white100 whitespace-nowrap">
					다시 보지 않기
				</span>
			</button>

			<button
				type="button"
				onClick={handleClose}
				className="flex items-center gap-gap-9"
			>
				<div className="flex items-center justify-center size-[42px] rounded-radius-max bg-color-alpha-white50 border border-color-gray-20">
					<CircleX size={20} className="text-color-alpha-white100" />
				</div>
				<span className="typo-heading-medium text-color-alpha-white100 whitespace-nowrap">
					닫기
				</span>
			</button>
		</div>
	);
};

export default OnboardingCloseButton;
