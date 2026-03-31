import clsx from "clsx";
import { Bell, Search, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_TRANSITION } from "@/app.constants";
import { MYPAGE_ROUTE_PATH } from "@/domains/my-page/mypage.routes";
import useTeams from "@/hooks/useTeams";
import useUser from "@/hooks/useUser";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { hasValidPath } from "@/utils/path";
import { NAVIGATION_ITEMS } from "./SideBar";
import SideBarDropdown from "./SideBarDropdown";
import SidebarItem from "./SidebarItem";

//
//
//

const MobileSidebar = () => {
	const { isSidebarOpen, toggleSidebarOpen } = useSidebarOpenStore();
	const { user } = useUser();
	const { activeTeam } = useTeams();
	const location = useLocation();
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			{isSidebarOpen && (
				<button
					type="button"
					aria-label="사이드바 닫기"
					className="fixed inset-0 bg-color-gray-40/50 z-40 md:hidden cursor-default"
					onClick={toggleSidebarOpen}
				/>
			)}

			<aside
				className={clsx(
					"fixed top-0 right-0 z-50 h-full w-[255px] rounded-l-radius-medium3",
					"bg-color-alpha-white100 flex flex-col shadow-xxl md:hidden",
					SIDEBAR_TRANSITION,
					isSidebarOpen ? "translate-x-0" : "translate-x-full",
				)}
			>
				<div className="flex items-center p-padding-4">
					<div className="flex-1 min-w-0">
						<SideBarDropdown />
					</div>
					<button
						type="button"
						onClick={toggleSidebarOpen}
						className="p-padding-4 text-color-gray-60 shrink-0"
					>
						<X size={20} />
					</button>
				</div>

				<div className="px-padding-4 pb-padding-4">
					<div className="flex items-center gap-gap-5 bg-color-gray-5 rounded-medium1 px-padding-6 h-[36px]">
						<Search size={20} className="text-color-gray-30 shrink-0" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="문제 검색"
							className="bg-transparent w-full typo-body-medium text-color-gray-30 placeholder:text-color-gray-30 outline-none"
						/>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-padding-4">
					<div className="flex flex-col gap-gap-5">
						{activeTeam &&
							NAVIGATION_ITEMS.filter(
								(item) => !item.isMakerOnly || activeTeam.role !== "PLAYER",
							).map((item) => (
								<SidebarItem
									key={item.path}
									className={clsx("text-color-gray-30", {
										"text-color-primary-50 !typo-heading-xsmall bg-primary-5":
											hasValidPath(item.activePaths, location.pathname),
									})}
								>
									<Link
										to={item.path}
										className="flex items-center gap-gap-5"
										onClick={toggleSidebarOpen}
									>
										{item.icon}
										<span>{item.label}</span>
									</Link>
								</SidebarItem>
							))}
					</div>
				</div>

				<div className="border-t border-color-gray-20 p-padding-4">
					<div className="flex items-center justify-between p-padding-4">
						<Link
							to={MYPAGE_ROUTE_PATH.ROOT}
							className="flex items-center gap-gap-5"
							onClick={toggleSidebarOpen}
						>
							<UserRound size={20} />
							<span className="typo-body-medium">{user?.name}</span>
						</Link>
						<Bell size={20} />
					</div>
				</div>
			</aside>
		</>
	);
};

export default MobileSidebar;
