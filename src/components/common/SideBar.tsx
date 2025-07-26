import { ChevronsLeft, NotebookPen } from "lucide-react";
import React from "react";
import logo from "../../assets/logo.png";
import Dropdown, { type IconContent } from "./Dropdown";
import SideBarNavigationMenuList from "./SideBarNavigationMenuList";

//
//
//

const TEAM_SPACES: IconContent[] = [
	{
		icon: (className) => <NotebookPen className={className} />,
		text: "코테이토 11기 교육팀",
	},
	{
		icon: (className) => <NotebookPen className={className} />,
		text: "숙명여대 IT공학전공 20학번",
	},
	{
		icon: (className) => <NotebookPen className={className} />,
		text: "코테이토 12기 교육팀",
	},
	{
		icon: (className) => <NotebookPen className={className} />,
		text: "코테이토 13기 교육팀",
	},
];

//
//
//

const SideBar = () => {
	return (
		<div className="bg-alpha-white-100 p-8 w-[17.5rem] h-[64rem] fixed top-0 left-0  shadow-xxl">
			<div className="flex flex-col items-center w-full">
				<div className="flex items-center w-full h-fit justify-between mb-8">
					<img className="h-9" src={logo} alt="로고" />
					<ChevronsLeft className="w-6 h-6 text-alpha-black-100 cursor-pointer" />
				</div>
				<div className="w-full mb-[0.62rem]">
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
