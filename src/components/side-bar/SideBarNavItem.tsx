import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useTeams from "@/hooks/useTeams";
import { hasValidPath } from "@/utils/path";
import { GTM_EVENT_NAMES, trackEvent } from "@/utils/track-event";
import SidebarItem from "./SidebarItem";

//
//
//

export interface NavItem {
	icon?: React.ReactNode;
	label: string;
	path?: string;
	activePaths: string[];
	isMakerOnly: boolean;
	subItems?: NavItem[];
	onboardingStep?: string;
}

interface SideBarNavItemProps {
	item: NavItem;
}

//
//
//

const SideBarNavItem = ({ item }: SideBarNavItemProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const { isMakerOrAbove } = useTeams();

	const location = useLocation();

	/**
	 *
	 */
	const handleNavigationItemClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
	) => {
		if (item.path === "/dashboard") {
			trackEvent(GTM_EVENT_NAMES.dashboardNavClick, {
				entry_source: "sidebar",
			});
		}

		if (!item.path) {
			e.preventDefault();
			setIsExpanded((prev) => !prev);
		}
	};

	/**
	 *
	 */
	const hasValidSubItemPath = (candidates: string[], currentPath: string) => {
		const removeFirstPath = (path: string) =>
			`/${path.split("/").slice(2).join("/")}`;

		return hasValidPath(
			candidates.map((candidate) => removeFirstPath(candidate)),
			removeFirstPath(currentPath),
		);
	};

	if (item.isMakerOnly && !isMakerOrAbove) {
		return null;
	}

	return (
		<div className="flex flex-col gap-gap-5">
			<SidebarItem
				className={clsx("flex justify-between text-color-gray-30", {
					"text-color-primary-50 !typo-heading-xsmall bg-primary-5":
						hasValidPath(item.activePaths, location.pathname),
				})}
			>
				<Link
					to={item.path || "#"}
					state={
						item.path === "/dashboard" ? { entrySource: "sidebar" } : undefined
					}
					className="w-full flex items-center gap-gap-5"
					onClick={handleNavigationItemClick}
				>
					{item.icon}
					<span>{item.label}</span>
				</Link>
				{item.subItems && (isExpanded ? <ChevronDown /> : <ChevronUp />)}
			</SidebarItem>
			<div>
				{item.subItems &&
					isExpanded &&
					item.subItems
						.filter((subItem) => !subItem.isMakerOnly || isMakerOrAbove)
						.map((subItem, index, arr) => {
							return (
								<div key={subItem.path}>
									<div
										className={clsx(
											"ml-4 border-l border-color-gray-30 typo-body-medium",
											{
												"border-color-primary-50": hasValidSubItemPath(
													subItem.activePaths,
													location.pathname,
												),
											},
										)}
									>
										<Link
											to={subItem.path || "#"}
											className={clsx(
												"ml-4 flex items-center gap-gap-5 text-color-gray-30",
												{
													"text-color-primary-50": hasValidSubItemPath(
														subItem.activePaths,
														location.pathname,
													),
												},
											)}
										>
											{subItem.icon}
											<span>{subItem.label}</span>
										</Link>
									</div>
									{index !== arr.length - 1 && (
										<div className="h-[10px] ml-4 border-l border-color-gray-30" />
									)}
								</div>
							);
						})}
			</div>
		</div>
	);
};

export default SideBarNavItem;
