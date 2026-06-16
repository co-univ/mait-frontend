import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowRight, ClipboardPenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { Table } from "@/components/table";
import useTeams from "@/hooks/useTeams";
import { createPath } from "@/utils/create-path";
import DashboardHeader from "../../components/common/DashboardHeader";
import { DASHBOARD_ROUTE_PATH } from "../../dashboard.routes";
import { questionSetsStatisticsQueryOptions } from "../../queries/common/dashboardQueries";

//
//
//

const DashboardQuestionSets = () => {
	const navigate = useNavigate();

	const { activeTeam } = useTeams();

	const { data } = useQuery(
		questionSetsStatisticsQueryOptions(activeTeam?.teamId ?? 0),
	);

	const questionSets = data?.data ?? [];

	return (
		<Table.Root className="border-color-gray-20 shadow-base">
			<div className="pt-padding-11 pb-padding-10 px-padding-11">
				<DashboardHeader icon={<ClipboardPenLine />} title="문제셋 정보" />
			</div>
			<Table.Header className="h-size-height-7 bg-color-gray-5">
				<Table.HeaderCell width="10px" />
				<Table.HeaderCell grow width="180px" className="max-w-[320px]">
					문제셋 제목
				</Table.HeaderCell>
				<Table.HeaderCell width="160px">풀이 날짜</Table.HeaderCell>
				<Table.HeaderCell grow width="280px">
					우승자 이름
				</Table.HeaderCell>
				<Table.HeaderCell width="260px">내 정답률</Table.HeaderCell>
				<Table.HeaderCell width="132px">문제 셋 보기</Table.HeaderCell>
			</Table.Header>

			<Table.Divider />

			<Table.Body>
				{questionSets.map((questionSet, index) => (
					<>
						<Table.Row
							key={questionSet.questionSetId}
							className="h-size-height-9"
						>
							<Table.Cell width="10px" />
							<Table.Cell grow width="180px" className="truncate max-w-[320px]">
								{questionSet.title}
							</Table.Cell>
							<Table.Cell width="160px">
								{dayjs(questionSet.solvedAt).format("YYYY-MM-DD")}
							</Table.Cell>
							<Table.Cell grow width="280px" className="truncate">
								{questionSet.winners
									.map((winner) => `${winner.name}(${winner.nickname})`)
									.join(", ")}
							</Table.Cell>
							<Table.Cell width="260px">
								{questionSet.myCorrectRate ?? "-"}
							</Table.Cell>
							<Table.Cell width="132px">
								<Button
									icon={<ArrowRight />}
									item="자세히보기"
									className="bg-color-primary-5 text-color-primary-50 border-none !p-padding-4 typo-body-xsmall-bold flex-row-reverse"
									onClick={() =>
										navigate(
											createPath(DASHBOARD_ROUTE_PATH.QUESTION_ROOT, {
												questionSetId: questionSet.questionSetId,
											}),
										)
									}
								/>
							</Table.Cell>
						</Table.Row>
						{index !== questionSets.length - 1 && <Table.Divider />}
					</>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export default DashboardQuestionSets;
