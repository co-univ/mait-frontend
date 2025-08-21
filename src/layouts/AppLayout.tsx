import type React from "react";
import Header from "@/components/common/header/Header";
import Sidebar from "@/components/common/sidebar/SideBar";

//
//
//

const MAIN_CONTENT_MAX_WIDTH = "1096px";
const MAIN_CONTENT_PADDING = "48px";

interface AppLayoutProps {
	children: React.ReactNode;
}

//
//
//

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<div className="w-screen h-screen">
			<Header />
			<div className="flex w-full h-full">
				<Sidebar />
				<main
					className="flex-1"
					style={{
						maxWidth: MAIN_CONTENT_MAX_WIDTH,
						padding: MAIN_CONTENT_PADDING,
					}}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
