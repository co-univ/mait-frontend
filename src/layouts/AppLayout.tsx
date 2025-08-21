import type React from "react";
import Header from "@/components/common/header/Header";
import Sidebar from "@/components/common/sidebar/SideBar";

//
//
//

const MAIN_CONTENT_MAX_WIDTH = "1114px";
const MAIN_CONTENT_PADDING = "0 48px";

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
			<div className="relative flex w-full h-full">
				<Sidebar />
				<main className="flex w-full h-full justify-center">
					<div
						className="w-full"
						style={{
							maxWidth: MAIN_CONTENT_MAX_WIDTH,
							padding: MAIN_CONTENT_PADDING,
						}}
					>
						{children}
					</div>
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
