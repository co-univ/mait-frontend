import { ChevronsLeft } from "lucide-react";
import React from "react";
import logo from "../../assets/logo.png";
import Dropdown from "./Dropdown";
import SideBarNavigationMenuList from "./SideBarNavigationMenuList";

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
					<Dropdown />
				</div>
				<div className="w-full">
					<SideBarNavigationMenuList />
				</div>
			</div>
		</div>
	);
};

export default SideBar;
