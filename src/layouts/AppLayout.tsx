import clsx from "clsx";
import type React from "react";
import { useLocation } from "react-router-dom";
import {
	LARGE_PAGE_MARGIN,
	SMALL_PAGE_MARGIN,
	SMALL_PAGE_MARGIN_PATHS,
} from "@/app.constants";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/SideBar";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { hasFirstValidPath } from "@/utils/path";
import { SIDEBAR_TRANSITION } from "../app.constants";

//
//
//

interface AppLayoutProps {
	children: React.ReactNode;
}

//
//
//

const AppLayout = ({ children }: AppLayoutProps) => {
	const location = useLocation();
	const { isSidebarOpen } = useSidebarOpenStore();

	const getPageMargin = () => {
		const isSmallMarginPage = hasFirstValidPath(
			SMALL_PAGE_MARGIN_PATHS,
			location.pathname,
		);

		if (isSidebarOpen || isSmallMarginPage) {
			return SMALL_PAGE_MARGIN;
		}

		return LARGE_PAGE_MARGIN;
	};

	return (
		<div className="w-screen h-screen">
			<Header />
			<div className="relative flex w-full h-full">
				<Sidebar />
				<main
					className={clsx(
						"flex w-full h-full justify-center",
						SIDEBAR_TRANSITION,
					)}
					style={{
						margin: `0 ${getPageMargin()}px`,
					}}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
