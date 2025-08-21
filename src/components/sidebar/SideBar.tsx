import clsx from "clsx";
import { LayoutDashboard, Puzzle, SquarePen, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
	SIDEBAR_TRANSITION,
	SIDEBAR_WIDTH,
	SMALL_PAGE_MARGIN_PATHS,
} from "@/app.constants";
import useUser from "@/hooks/useUser";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { hasFirstValidPath } from "@/utils/path";
import SidebarItem from "./SidebarItem";

//
//
//

const NAVIGATION_ITEMS = [
	{ icon: <SquarePen />, label: "문제 관리", path: "/management" },
	{ icon: <Puzzle />, label: "문제 풀기", path: "/solving" },
	{
		icon: <LayoutDashboard />,
		label: "풀이 결과 대시보드",
		path: "/dashboard",
	},
	{ icon: <Users />, label: "팀 관리", path: "/team" },
];

//
//
//

const SideBar = () => {
	const { isSidebarOpen } = useSidebarOpenStore();
	const { user } = useUser();
	const location = useLocation();

	const sidebarVariant: "default" | "elevation" = hasFirstValidPath(
		SMALL_PAGE_MARGIN_PATHS,
		location.pathname,
	)
		? "elevation"
		: "default";

	const isSidebarOpenWithUser = isSidebarOpen && user;

	return (
		<nav
			className={clsx(
				"sticky top-0 flex flex-col items-center py-padding-12 bg-color-alpha-white100 transition-all duration-300 transition-ease-out overflow-hidden",
				{
					"flex-grow shadow-xl": sidebarVariant === "default",
					"absolute top-0 left-0 h-[80%] shadow-xxl border border-color-gray-10 rounded-r-radius-large1 rounded-bl-radius-large1":
						sidebarVariant === "elevation",
				},
				SIDEBAR_TRANSITION,
			)}
			style={{
				width: isSidebarOpenWithUser ? SIDEBAR_WIDTH : "0",
			}}
		>
			<SidebarItem>
				<div>코테이토 11기 교육팀</div>
			</SidebarItem>

			<div className="h-size-height-1" />

			<div className="flex flex-col gap-gap-5">
				{NAVIGATION_ITEMS.map((item) => (
					<SidebarItem
						key={item.path}
						className={clsx("text-color-gray-30", {
							"text-color-primary-50 typo-heading-xsmall bg-primary-5":
								hasFirstValidPath([item.path], location.pathname),
						})}
					>
						<Link to={item.path} className="flex items-center gap-gap-5">
							{item.icon}
							<span>{item.label}</span>
						</Link>
					</SidebarItem>
				))}
			</div>
		</nav>
	);
};

export default SideBar;
