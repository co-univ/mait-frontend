import { PencilLine } from "lucide-react";

//
//
//

interface DashboardQuestionScoreProps {
	totalCount?: number;
	correctCount?: number;
	score?: number;
}

//
//
//

const DashboardQuestionScore = ({
	totalCount,
	correctCount,
	score,
}: DashboardQuestionScoreProps) => {
	return (
		<div className="flex gap-gap-5 items-center">
			<PencilLine size={40} />
			<span className="typo-heading-large text-color-alpha-black100">
				<span className="text-color-primary-50">{score ?? "-"}점</span> ({" "}
				<span className="text-color-primary-50">{correctCount ?? "-"}</span> /{" "}
				{totalCount ?? "-"} )
			</span>
		</div>
	);
};

export default DashboardQuestionScore;
