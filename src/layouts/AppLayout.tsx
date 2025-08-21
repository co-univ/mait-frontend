import clsx from "clsx";
import type React from "react";
import {
	LARGE_PAGE_MARGIN,
	SMALL_PAGE_MARGIN,
	SMALL_PAGE_MARGIN_PATHS,
} from "@/app.constnats";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/SideBar";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { SIDEBAR_TRANSITION } from "../app.constnats";

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
	const { isSidebarOpen } = useSidebarOpenStore();

	const getPageMargin = () => {
		const isSmallMarginPage = SMALL_PAGE_MARGIN_PATHS.includes(
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
