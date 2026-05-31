import {
	FolderOpen,
	LayoutDashboard,
	Puzzle,
	SquarePen,
	Users,
} from "lucide-react";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import { SOLVING_ROUTE_PATH } from "@/domains/solving/solving.routes";
import { TEAM_MANAGEMENT_ROUTE_PATH } from "@/domains/team-management/team-management.routes";
import type { TeamApiResponse } from "@/libs/types";
import type { NavItem } from "./SideBarNavItem";

const BASE_NAVIGATION_ITEMS: NavItem[] = [
	{
		icon: <SquarePen />,
		label: "문제 관리",
		path: MANAGEMENT_ROUTE_PATH.ROOT,
		activePaths: ["/management", "/creation", "/control"],
		isMakerOnly: true,
	},
	{
		icon: <Puzzle />,
		label: "문제 풀기",
		path: SOLVING_ROUTE_PATH.ROOT,
		activePaths: ["/solving"],
		isMakerOnly: false,
	},
	{
		icon: <LayoutDashboard />,
		label: "풀이 결과 대시보드",
		path: "/dashboard",
		activePaths: ["/dashboard"],
		isMakerOnly: false,
	},
];

/**
 * Returns sidebar navigation items based on the active team type.
 * PERSONAL teams have no members, so a single "Category Management" item is shown instead of "Team Management" with subItems.
 * @param activeTeam The currently selected team
 */
export const getNavigationItems = (activeTeam?: TeamApiResponse): NavItem[] => {
	if (activeTeam?.teamType === "PERSONAL") {
		return [
			...BASE_NAVIGATION_ITEMS,
			{
				icon: <FolderOpen />,
				label: "카테고리 관리",
				path: TEAM_MANAGEMENT_ROUTE_PATH.CATEGORIES,
				activePaths: ["/team-management/categories"],
				isMakerOnly: true,
			},
		];
	}

	return [
		...BASE_NAVIGATION_ITEMS,
		{
			icon: <Users />,
			label: "팀 관리",
			activePaths: ["/team-management"],
			isMakerOnly: false,
			subItems: [
				{
					label: "멤버 관리",
					path: TEAM_MANAGEMENT_ROUTE_PATH.USERS,
					activePaths: ["/team-management/users"],
					isMakerOnly: false,
				},
				{
					label: "카테고리 관리",
					path: TEAM_MANAGEMENT_ROUTE_PATH.CATEGORIES,
					activePaths: ["/team-management/categories"],
					isMakerOnly: true,
				},
			],
		},
	];
};
