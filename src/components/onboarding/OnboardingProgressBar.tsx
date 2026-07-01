import clsx from "clsx";
import useOnboarding from "@/hooks/useOnboarding";

//
//
//

const OnboardingProgressBar = () => {
	const { totalSteps, currentFlatIndex, goToStep } = useOnboarding();

	return (
		<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[62] flex items-center gap-1.5">
			{Array.from({ length: totalSteps }, (_, idx) => (
				<button
					// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key is acceptable here since the number of steps is static and does not change dynamically.
					key={idx}
					type="button"
					aria-label={`${idx + 1}번 스텩으로 이동`}
					aria-current={idx === currentFlatIndex ? "step" : undefined}
					onClick={() => goToStep(idx)}
					className={clsx(
						"rounded-radius-max transition-all duration-200",
						idx === currentFlatIndex
							? "w-6 h-2 bg-color-alpha-white100"
							: "size-2 bg-color-alpha-white25",
					)}
				/>
			))}
		</div>
	);
};

export default OnboardingProgressBar;
