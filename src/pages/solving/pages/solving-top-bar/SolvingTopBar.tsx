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
	onSubmit: () => void;
	isSubmitting?: boolean;
	isSubmitAllowed: boolean;
}

//
//
//

const SolvingTopBar = ({
	questionNum,
	quizTitle,
	questionCount,
	onSubmit,
	isSubmitting,
	isSubmitAllowed,
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
				badgeIcon={<Puzzle className="stroke-primary-50" />}
				buttonLabel="제출하기"
				buttonIcon={
					<ChevronRight
						className={
							isSubmitAllowed ? "stroke-primary-50" : "stroke-color-gray-20"
						}
					/>
				}
				onSubmit={onSubmit}
				disabled={isSubmitting || !isSubmitAllowed}
			/>
		</div>
	);
};

export default SolvingTopBar;
