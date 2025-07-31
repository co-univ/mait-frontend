import clsx from "clsx";
import { ChevronsLeft, NotebookPen } from "lucide-react";
import type React from "react";
import logo from "../../assets/logo.png";
import Dropdown, { type IconContent } from "./Dropdown";
import SideBarNavigationMenuList from "./SideBarNavigationMenuList";

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

interface SideBarProps {
	isSideBarOpen: boolean;
	setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//
//
//

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }: SideBarProps) => {
	/**
	 *
	 */
	const handleHideButtonClick = () => {
		setIsSideBarOpen(false);
	};

	return (
		<div
			className={clsx(
				"fixed left-0 top-0 h-[64rem] w-[17.5rem] bg-alpha-white-100 p-8 shadow-xxl transition-all duration-300 ease-in-out",
				{
					"translate-x-0": isSideBarOpen,
					"-translate-x-full": !isSideBarOpen,
				},
			)}
		>
			<div className="flex w-full flex-col items-center">
				<div className="mb-8 flex h-fit w-full items-center justify-between">
					<img className="h-9" src={logo} alt="로고" />
					<ChevronsLeft
						className="h-6 w-6 cursor-pointer text-alpha-black-100"
						onClick={handleHideButtonClick}
					/>
				</div>
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
					<SideBarNavigationMenuList />
				</div>
			</div>
		</div>
	);
};

export default SideBar;
