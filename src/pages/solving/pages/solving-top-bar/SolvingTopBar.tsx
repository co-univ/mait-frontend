import { ChevronRight, Puzzle } from "lucide-react";
import SolvingHeader from "../../components/SolvingHeader";
import SolvingTopBarControl from "./SolvingTopBarControl";

//
//
//

interface SolvingTopBarProps {
	questionNum: number;
	quizTitle: string;
	questionCount: number;
}

//
//
//

const SolvingTopBar = ({ questionNum, quizTitle, questionCount }: SolvingTopBarProps) => {
	return (
		<div className="sticky top-0 bg-alpha-white100">
			<SolvingHeader title={quizTitle} questionNum={questionNum} questionCount={questionCount}/>
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
