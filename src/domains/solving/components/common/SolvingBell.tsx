import Lottie from "react-lottie";
import bell from "src/assets/lotties/solving-bell.json";
import useBreakpoint from "@/hooks/useBreakpoint";

//
//
//

const OPTIONS = {
	loop: false,
	autoplay: true,
	animationData: bell,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

//
//
//

interface SolvingBellProps {
	open: boolean;
}

//
//
//

const SolvingBell = ({ open }: SolvingBellProps) => {
	const { isMobile } = useBreakpoint();

	if (!open) {
		return;
	}

	return (
		<div className="absolute left-1/2 -translate-x-1/2 top-[6rem] z-10">
			<Lottie options={OPTIONS} width={isMobile ? 90 : undefined} height={isMobile ? 90 : undefined} />
		</div>
	);
};

export default SolvingBell;
