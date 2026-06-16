import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowRight, ClipboardPenLine } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@/components/Button";
import { Table } from "@/components/table";
import useTeams from "@/hooks/useTeams";
import { createPath } from "@/utils/create-path";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardSortableHeaderCell from "../../components/question-sets/DashboardSortableHeaderCell";
import { DASHBOARD_ROUTE_PATH } from "../../dashboard.routes";
import { questionSetsStatisticsQueryOptions } from "../../queries/common/dashboardQueries";

//
//
//

type SortField = "solvedAt" | "myCorrectRate";
type SortDirection = "asc" | "desc" | null;

const SORT_FIELDS: SortField[] = ["solvedAt", "myCorrectRate"];

//
//
//

const DashboardQuestionSets = () => {
	const navigate = useNavigate();

	const { activeTeam } = useTeams();

	const { data } = useQuery(
		questionSetsStatisticsQueryOptions(activeTeam?.teamId ?? 0),
	);

	const [searchParams, setSearchParams] = useSearchParams();

	const sortFieldParam = searchParams.get("sortField");
	const sortField = SORT_FIELDS.includes(sortFieldParam as SortField)
		? (sortFieldParam as SortField)
		: null;
	const sortDirection: SortDirection =
		searchParams.get("sortDirection") === "asc" ||
		searchParams.get("sortDirection") === "desc"
			? (searchParams.get("sortDirection") as SortDirection)
			: null;

	/**
	 *
	 */
	const handleSort = (field: SortField) => {
		const newParams = new URLSearchParams(searchParams);

		if (sortField !== field) {
			newParams.set("sortField", field);
			newParams.set("sortDirection", "asc");
		} else if (sortDirection === "asc") {
			newParams.set("sortDirection", "desc");
		} else {
			newParams.delete("sortField");
			newParams.delete("sortDirection");
		}

		setSearchParams(newParams);
	};

	//
	const questionSets = useMemo(() => {
		const list = data?.data ?? [];

		if (!sortField || !sortDirection) {
			return list;
		}

		const sorted = [...list].sort((a, b) => {
			if (sortField === "solvedAt") {
				return dayjs(a.solvedAt).valueOf() - dayjs(b.solvedAt).valueOf();
			}

			return (a.myCorrectRate ?? -1) - (b.myCorrectRate ?? -1);
		});

		return sortDirection === "asc" ? sorted : sorted.reverse();
	}, [data, sortField, sortDirection]);

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
				<Table.HeaderCell width="120px">풀이 모드</Table.HeaderCell>
				<DashboardSortableHeaderCell
					width="160px"
					direction={sortField === "solvedAt" ? sortDirection : null}
					onClick={() => handleSort("solvedAt")}
				>
					풀이 날짜
				</DashboardSortableHeaderCell>
				<Table.HeaderCell grow width="280px">
					우승자 이름
				</Table.HeaderCell>
				<DashboardSortableHeaderCell
					width="132px"
					direction={sortField === "myCorrectRate" ? sortDirection : null}
					onClick={() => handleSort("myCorrectRate")}
				>
					내 정답률
				</DashboardSortableHeaderCell>
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
							<Table.Cell width="120px">
								{{ LIVE_TIME: "실시간 모드", STUDY: "학습 모드" }[
									questionSet.solveMode
								] ?? ""}
							</Table.Cell>
							<Table.Cell width="160px">
								{dayjs(questionSet.solvedAt).format("YYYY-MM-DD")}
							</Table.Cell>
							<Table.Cell grow width="280px" className="truncate">
								{questionSet.winners
									.map((winner) => `${winner.name}(${winner.nickname})`)
									.join(", ")}
							</Table.Cell>
							<Table.Cell width="132px">
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
