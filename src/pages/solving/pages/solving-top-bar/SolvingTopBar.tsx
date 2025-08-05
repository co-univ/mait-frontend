import { ChevronRight, Puzzle } from "lucide-react";
import SolvingHeader from "@/pages/solving/components/SolvingHeader";
import SolvingTopBarControl from "@/pages/solving/pages/solving-top-bar/SolvingTopBarControl";

//
//
//

const SolvingTopBar = () => {
	return (
		<div className="sticky top-0 bg-alpha-white100">
			<SolvingHeader title="문제 해결" percentage={20} />
			<div className="h-size-height-5" />
			<SolvingTopBarControl
				badgeLabel="Q1"
				badgeIcon={<Puzzle className="stroke-primary-50" />}
				buttonLabel="제출하기"
				buttonIcon={<ChevronRight className="stroke-primary-50" />}
			/>
		</div>
	);
};

export default SolvingTopBar;
