import type React from "react";
import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

//
//
//

interface AppLayoutProps {
	isSideBarOpen: boolean;
	setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//
//
//

const AppLayout = ({ isSideBarOpen, setIsSideBarOpen }: AppLayoutProps) => {
	return (
		<div>
			<Header
				isSideBarOpen={isSideBarOpen}
				setIsSideBarOpen={setIsSideBarOpen}
			/>
			<SideBar
				isSideBarOpen={isSideBarOpen}
				setIsSideBarOpen={setIsSideBarOpen}
			/>
		</div>
	);
};

export default AppLayout;
