import { ChevronRight, Puzzle } from "lucide-react";
import SolvingLayout from "../layouts";
import SolvingControls from "./SolvingControls";
import SolvingHeader from "./SolvingHeader";

//
//
//

const Solving = () => {
	return (
		<SolvingLayout>
			<div className="sticky top-0">
				<SolvingHeader title="문제 해결" percentage={20} />
				<div className="h-size-height-5" />
				<SolvingControls
					badgeLabel="Q1"
					badgeIcon={<Puzzle className="stroke-primary-50" />}
					buttonLabel="제출하기"
					buttonIcon={<ChevronRight className="stroke-primary-50" />}
				/>
			</div>
			<div className="h-[1200px]" />
		</SolvingLayout>
	);
};

export default Solving;
