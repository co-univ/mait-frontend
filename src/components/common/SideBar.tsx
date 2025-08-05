import clsx from "clsx";
import { ChevronsLeft, NotebookPen } from "lucide-react";
import type React from "react";
import logo from "@/assets/logo.png";
import Dropdown, { type IconContent } from "@/components/common/Dropdown";
import SideBarMenuList from "@/components/common/SideBarMenuList";

//
//
//

const TEAM_SPACES: IconContent[] = [
	{
		id: 1,
		icon: (className) => <NotebookPen className={className} />,
		text: "코테이토 11기 교육팀",
	},
	{
		id: 2,
		icon: (className) => <NotebookPen className={className} />,
		text: "숙명여대 IT공학전공 20학번",
	},
	{
		id: 3,
		icon: (className) => <NotebookPen className={className} />,
		text: "코테이토 12기 교육팀",
	},
	{
		id: 4,
		icon: (className) => <NotebookPen className={className} />,
		text: "코테이토 13기 교육팀",
	},
];

//
//
//

export type SIDEBAR_VARIANT = "default" | "overlay";

interface SideBarProps {
	isSideBarOpen: boolean;
	variant?: SIDEBAR_VARIANT;
}

//
//
//

const SideBar = ({ isSideBarOpen, variant = "default" }: SideBarProps) => {
	return (
		<div
			className={clsx(
				"w-[17.5rem] bg-alpha-white100 p-5 shadow-xxl transition-all duration-300 ease-in-out h-full border border-gray-10 rounded-r-large1",
				{
					"absolute left-0 top-0 h-[calc(100vh-10rem)] z-10":
						variant === "overlay",
				},
				{
					"translate-x-0": isSideBarOpen && variant === "overlay",
					"-translate-x-full": !isSideBarOpen && variant === "overlay",
				},
			)}
		>
			<div className="flex w-full flex-col items-center">
				<div className="mb-[0.62rem] w-full">
					<Dropdown
						size="large"
						buttonType="collapse"
						buttonText="코테이토 11기 교육팀"
						group="전민재의 MAIT"
						contents={TEAM_SPACES}
					/>
				</div>
				<div className="w-full">
					<SideBarMenuList />
				</div>
			</div>
		</div>
	);
};

export default SideBar;
