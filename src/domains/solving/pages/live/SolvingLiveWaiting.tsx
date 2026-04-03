import clsx from "clsx";
import useBreakpoint from "@/hooks/useBreakpoint";

//
//
//

const SolvingLiveWaiting = () => {
	const { isMobile } = useBreakpoint();

	return (
		<div className="bg-gradient-to-b from-alpha-white100 to-primary-5 flex justify-center items-center w-screen h-screen fixed top-0 left-0">
			<div
				className={clsx(
					"flex items-center justify-center rounded-radius-medium1 bg-primary-5",
					isMobile ? "p-padding-8" : "py-padding-11 px-[100px]",
				)}
			>
				<p
					className={clsx(
						"text-primary-50",
						isMobile ? "typo-heading-xsmall" : "typo-heading-medium",
					)}
				>
					곧 문제가 시작됩니다. 잠시만 기다려 주세요!
				</p>
			</div>
		</div>
	);
};

export default SolvingLiveWaiting;
