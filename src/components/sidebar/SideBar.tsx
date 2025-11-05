import clsx from "clsx";
import { LayoutDashboard, Puzzle, SquarePen, Users } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	HEADER_HEIGHT,
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
	{ icon: <Users />, label: "팀 관리", path: "/team-manage" },
];

//
//
//

const SideBar = () => {
	const { isSidebarOpen, toggleSidebarOpen } = useSidebarOpenStore();
	const { user } = useUser();
	const location = useLocation();

	const sidebarVariant: "default" | "elevation" = hasFirstValidPath(
		SMALL_PAGE_MARGIN_PATHS,
		location.pathname,
	)
		? "elevation"
		: "default";

	const isSidebarOpenWithUser = isSidebarOpen && user;

	/**
	 *
	 */
	const getSidebarHeight = () => {
		if (sidebarVariant === "default") {
			return `calc(100vh - ${HEADER_HEIGHT}px)`;
		}

		if (sidebarVariant === "elevation") {
			return `calc(100vh - ${HEADER_HEIGHT}px - ${96}px)`;
		}

		return "100%";
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only when sidebarVariant changes
	useEffect(() => {
		if (sidebarVariant === "elevation" && isSidebarOpen) {
			toggleSidebarOpen();
		}
	}, [sidebarVariant]);

	return (
		<aside
			className={clsx(
				"py-padding-12 bg-color-alpha-white100 flex-grow-0 overflow-hidden fixed z-50",
				SIDEBAR_TRANSITION,
				{
					"flex-grow shadow-xl": sidebarVariant === "default",
					"left-0 shadow-xxl border border-color-gray-10 rounded-r-radius-large1 rounded-bl-radius-large1":
						sidebarVariant === "elevation",
				},
			)}
			style={{
				width: isSidebarOpenWithUser ? SIDEBAR_WIDTH : "0",
				height: getSidebarHeight(),
				top: HEADER_HEIGHT,
			}}
		>
			<nav className="flex flex-col items-center">
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
		</aside>
	);
};

export default SideBar;
