import clsx from "clsx";
import type React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	HEADER_HEIGHT,
	LARGE_PAGE_MARGIN,
	SIDEBAR_WIDTH,
	SMALL_PAGE_MARGIN,
	SMALL_PAGE_MARGIN_PATHS,
} from "@/app.constants";
import Header from "@/components/header/Header";
import Sidebar from "@/components/side-bar/SideBar";
import useUser from "@/hooks/useUser";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { hasValidPath } from "@/utils/path";
import { SIDEBAR_TRANSITION } from "../app.constants";

//
//
//

const GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE = {
	background:
		"radial-gradient(100% 100% at 50% 0%, #F2ECFE 6.94%, #D8E5FD 46.15%, #ECF2FE 70.19%, #FFF 100%)",
};

const GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE_PATHS = [
	"/login",
	"/account",
	"/mypage",
];

const GRADATION_PRIMARY_LINEAR_BACKGROUND_STYLE = {
	background: "linear-gradient(180deg, #FFF 0%, #ECF2FE 89.42%, #ECF2FE 100%)",
};

const GRADATION_PRIMARY_LINEAR_BACKGROUND_STYLE_PATHS = ["/", "/invite"];

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
	const [isGradationSecondaryRadialPage, setIsGradationSecondaryRadialPage] =
		useState(false);
	const [isGradationPrimaryLinearPage, setIsGradationPrimaryLinearPage] =
		useState(false);

	const location = useLocation();
	const { isSidebarOpen } = useSidebarOpenStore();
	const { user } = useUser();

	/**
	 *
	 */
	const getPageMargin = () => {
		const ret = {
			top: HEADER_HEIGHT,
			bottom: 0,
			left: 0,
			right: 0,
		};

		const isSmallMarginPage = hasValidPath(
			SMALL_PAGE_MARGIN_PATHS,
			location.pathname,
		);

		const isSidebarOpenWithUser = user && isSidebarOpen;

		if (isSidebarOpenWithUser && !isSmallMarginPage) {
			ret.left += SIDEBAR_WIDTH;
		}

		if (isSidebarOpenWithUser || isSmallMarginPage) {
			ret.left += SMALL_PAGE_MARGIN;
			ret.right += SMALL_PAGE_MARGIN;
		} else {
			ret.left += LARGE_PAGE_MARGIN;
			ret.right += LARGE_PAGE_MARGIN;
		}

		return `${ret.top}px ${ret.right}px ${ret.bottom}px ${ret.left}px`;
	};

	/**
	 *
	 */
	const getBackgroundStyle = () => {
		if (isGradationSecondaryRadialPage) {
			return GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE;
		}

		if (isGradationPrimaryLinearPage) {
			return GRADATION_PRIMARY_LINEAR_BACKGROUND_STYLE;
		}

		return {};
	};

	//
	useEffect(() => {
		const isGradationSecondaryRadialPage =
			GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE_PATHS.some((path) =>
				location.pathname.startsWith(path),
			);
		const isGradationPrimaryLinearPage =
			GRADATION_PRIMARY_LINEAR_BACKGROUND_STYLE_PATHS.some((path) =>
				location.pathname.startsWith(path),
			);

		setIsGradationSecondaryRadialPage(isGradationSecondaryRadialPage);
		setIsGradationPrimaryLinearPage(isGradationPrimaryLinearPage);
	}, [location]);

	return (
		<div
			className="flex flex-col min-w-screen min-h-screen"
			style={getBackgroundStyle()}
		>
			<Header isTransparentBackground={isGradationSecondaryRadialPage} />
			<div className="relative flex flex-1">
				<Sidebar />
				<main
					className={clsx("flex-1", SIDEBAR_TRANSITION)}
					style={{
						margin: getPageMargin(),
					}}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
