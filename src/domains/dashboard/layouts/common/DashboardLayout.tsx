import type React from "react";

//
//
//

interface DashboardLayoutProps {
	children: React.ReactNode;
}

//
//
//

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<div className="w-full h-full flex flex-col gap-gap-10 py-padding-12">
			{children}
		</div>
	);
};

export default DashboardLayout;
