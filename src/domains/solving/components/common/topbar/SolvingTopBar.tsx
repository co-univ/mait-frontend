import { ChevronRight, Puzzle } from "lucide-react";
import SolvingHeader from "../SolvingHeader";
import SolvingTopBarControl from "./SolvingTopBarControl";

//
//
//

interface SolvingTopBarProps {
	questionNum: number;
	quizTitle: string;
	questionCount: number;
	onSubmit: () => void;
	disabled: boolean;
}

//
//
//

const SolvingTopBar = ({
	questionNum,
	quizTitle,
	questionCount,
	onSubmit,
	disabled,
}: SolvingTopBarProps) => {
	return (
		<div className="sticky top-0 bg-alpha-white100">
			<SolvingHeader
				title={quizTitle}
				questionNum={questionNum}
				questionCount={questionCount}
			/>
			<div className="h-size-height-5" />
			<SolvingTopBarControl
				badgeLabel={`Q${questionNum}`}
				badgeIcon={<Puzzle />}
				buttonLabel="제출하기"
				buttonIcon={<ChevronRight />}
				onSubmit={onSubmit}
				disabled={disabled}
			/>
		</div>
	);
};

export default SolvingTopBar;
