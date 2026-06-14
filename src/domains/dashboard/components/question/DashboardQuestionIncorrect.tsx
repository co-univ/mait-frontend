import { useNavigate, useParams } from "react-router-dom";
import { FILL_BLANK_PATTERN } from "src/app.constants";
import StatusBar from "@/components/StatusBar";
import { createPath } from "@/utils/create-path";
import { DASHBOARD_ROUTE_PATH } from "../../dashboard.routes";
import useDashboardQuestions from "../../hooks/question/useDashboardQuestions";

//
//
//

interface DashboardQuestionIncorrectProps {
	rank: number;
	rate: number;
	questionId: number;
	lines?: number;
}

const LINE_CLAMP: Record<number, string> = {
	1: "line-clamp-1",
	2: "line-clamp-2",
};

//
//
//

const DashboardQuestionIncorrect = ({
	rank,
	rate,
	questionId,
	lines = 2,
}: DashboardQuestionIncorrectProps) => {
	const navigate = useNavigate();

	const questionSetId = Number(useParams().questionSetId);

	const { targetQuestion: question } = useDashboardQuestions({
		questionSetId,
		questionId,
	});

	const content =
		(question?.type as string) === "FILL_BLANK"
			? (question?.content?.replace(FILL_BLANK_PATTERN, "___") ?? "")
			: (question?.content ?? "");

	return (
		<div className="w-full flex-1 flex items-center gap-gap-8 p-padding-10 bg-color-gray-5 border border-color-gray-10 rounded-radius-medium2 typo-body-xsmall text-color-alpha-black100">
			<span className="whitespace-nowrap">{rank}위</span>
			<span className={`grow ${LINE_CLAMP[lines] ?? "line-clamp-2"}`}>
				{content}
			</span>
			<span className="w-[160px] shrink-0">
				<StatusBar rate={rate} color="danger" />
			</span>
			<span>{rate}%</span>
			<button
				type="button"
				className="whitespace-nowrap border-b border-color-alpha-black100"
				onClick={() =>
					navigate(
						createPath(DASHBOARD_ROUTE_PATH.QUESTION, {
							questionSetId,
							questionId,
						}),
					)
				}
			>
				문제 확인하기
			</button>
		</div>
	);
};

export default DashboardQuestionIncorrect;
