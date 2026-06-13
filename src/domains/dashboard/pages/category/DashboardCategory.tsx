import { ChevronDown } from "lucide-react";
import { useState } from "react";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import DashboardCategoryHeader from "../../components/category/DashboardCategoryHeader";
import DashboardCategoryItem from "../../components/category/DashboardCategoryItem";

//
//
//

const INITIAL_VISIBLE_COUNT = 8;

//
//
//

const DashboardCategory = () => {
	const { activeTeam } = useTeams();
	const [isExpanded, setIsExpanded] = useState(false);

	const { data } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/{teamId}/categories/correct-rates",
		{
			params: {
				path: {
					teamId: activeTeam?.teamId ?? 0,
				},
			},
		},
	);

	const categories = data?.data ?? [];

	const hiddenCount = Math.max(0, categories.length - INITIAL_VISIBLE_COUNT);
	const visibleCategories = isExpanded
		? categories
		: categories.slice(0, INITIAL_VISIBLE_COUNT);

	const leftColumnCategories = visibleCategories.filter(
		(_, index) => index % 2 === 0,
	);
	const rightColumnCategories = visibleCategories.filter(
		(_, index) => index % 2 !== 0,
	);

	return (
		<div className="flex flex-col w-full gap-gap-9">
			<DashboardCategoryHeader />

			<div className="flex gap-gap-9">
				<div className="flex-1 flex flex-col gap-gap-5">
					{leftColumnCategories.map((category) => (
						<DashboardCategoryItem
							key={category.categoryId}
							category={category.categoryName}
							percentage={category.myCorrectRate ?? 0}
						/>
					))}
				</div>
				<div className="flex-1 flex flex-col gap-gap-5">
					{rightColumnCategories.map((category) => (
						<DashboardCategoryItem
							key={category.categoryId}
							category={category.categoryName}
							percentage={category.myCorrectRate ?? 0}
						/>
					))}
				</div>
			</div>

			{!isExpanded && hiddenCount > 0 && (
				<button
					type="button"
					onClick={() => setIsExpanded(true)}
					className="self-end flex items-center gap-1 typo-body-medium text-color-alpha-black100 border-b border-color-alpha-black100"
				>
					<span>&nbsp;외 {hiddenCount}개 더보기</span>
					<ChevronDown />
				</button>
			)}
		</div>
	);
};

export default DashboardCategory;
