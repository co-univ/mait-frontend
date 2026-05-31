import clsx from "clsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	HEADER_HEIGHT,
	SIDEBAR_TRANSITION,
	SIDEBAR_WIDTH,
	SMALL_PAGE_MARGIN_PATHS,
} from "@/app.constants";
import useTeams from "@/hooks/useTeams";
import useUser from "@/hooks/useUser";
import { GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE_PATHS } from "@/layouts/AppLayout";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { hasValidPath } from "@/utils/path";
import SideBarDropdown from "./SideBarDropdown";
import SideBarNavItem from "./SideBarNavItem";
import SidebarItem from "./SidebarItem";
import { getNavigationItems } from "./sidebar.constants";

//
//
//

const SideBar = () => {
	const { isSidebarOpen, toggleSidebarOpen } = useSidebarOpenStore();
	const { user } = useUser();
	const { activeTeam } = useTeams();

	const location = useLocation();

	const sidebarVariant: "default" | "elevation" = hasValidPath(
		SMALL_PAGE_MARGIN_PATHS,
		location.pathname,
	)
		? "elevation"
		: "default";

	const isSidebarOpenWithUser = isSidebarOpen && user;
	const isGradationSecondaryRadialPage =
		GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE_PATHS.some((path) =>
			hasValidPath([path], location.pathname),
		);

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

	//
	useEffect(() => {
		if (isGradationSecondaryRadialPage && isSidebarOpen) {
			toggleSidebarOpen();
		}
	}, [isGradationSecondaryRadialPage, isSidebarOpen, toggleSidebarOpen]);

	return (
		<aside
			className={clsx(
				"p-padding-12 bg-color-alpha-white100 flex-grow-0 overflow-hidden fixed z-40 hidden md:block",
				SIDEBAR_TRANSITION,
				{
					"flex-grow shadow-xl": sidebarVariant === "default",
					"left-0 shadow-xxl border border-color-gray-10 rounded-r-radius-large1 rounded-bl-radius-large1":
						sidebarVariant === "elevation",
				},
			)}
			style={{
				width: isSidebarOpenWithUser ? SIDEBAR_WIDTH : "0",
				padding: isSidebarOpenWithUser ? undefined : "0",
				height: getSidebarHeight(),
				top: HEADER_HEIGHT,
			}}
		>
			<nav className="w-[216px] flex flex-col items-center">
				<SidebarItem>
					<SideBarDropdown />
				</SidebarItem>

				<div className="h-size-height-1" />

				<div className="w-full flex flex-col gap-gap-5">
					{activeTeam &&
						getNavigationItems(activeTeam)
							.filter((item) => !item.isMakerOnly || activeTeam.role !== "PLAYER")
							.map((item) => <SideBarNavItem key={item.label} item={item} />)}
				</div>
			</nav>
		</aside>
	);
};

export default SideBar;
