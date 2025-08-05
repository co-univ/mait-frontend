import clsx from "clsx";
import type React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/common/Header";
import SideBar, { type SIDEBAR_VARIANT } from "@/components/common/SideBar";

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
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);
	const location = useLocation();

	const sidebarVariant: SIDEBAR_VARIANT = location.pathname.startsWith(
		"/creation",
	)
		? "overlay"
		: "default";

	return (
		<div className="flex flex-col min-h-screen">
			<Header
				isSideBarOpen={isSideBarOpen}
				setIsSideBarOpen={setIsSideBarOpen}
			/>
			<div className="flex flex-1 relative">
				<div
					className={clsx(
						"transition-all duration-300 ease-in-out overflow-hidden",
						{
							"w-[17.5rem]": isSideBarOpen && sidebarVariant === "default",
							"w-0": !isSideBarOpen && sidebarVariant === "default",
						},
					)}
				>
					{sidebarVariant === "default" && (
						<SideBar isSideBarOpen={isSideBarOpen} variant={sidebarVariant} />
					)}
				</div>
				{sidebarVariant === "overlay" && (
					<SideBar isSideBarOpen={isSideBarOpen} variant={sidebarVariant} />
				)}
				<main
					className={clsx(
						"flex-1 transition-all duration-300 ease-in-out",
						"p-8",
					)}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
