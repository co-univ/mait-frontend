import { ChevronRight, Puzzle } from "lucide-react";
import SolvingHeader from "../../components/SolvingHeader";
import SolvingTopBarControl from "./SolvingTopBarControl";

//
//
//

interface SolvingTopBarProps {
	questionNum?: number;
}

//
//
//

const SolvingTopBar = ({ questionNum }: SolvingTopBarProps) => {
	return (
		<div className="sticky top-0 bg-alpha-white100">
			<SolvingHeader title="문제 해결" percentage={20} />
			<div className="h-size-height-5" />
			<SolvingTopBarControl
				badgeLabel={`Q${questionNum}`}
				badgeIcon={<Puzzle className="stroke-primary-50" />}
				buttonLabel="제출하기"
				buttonIcon={<ChevronRight className="stroke-primary-50" />}
			/>
		</div>
	);
};

export default SolvingTopBar;
