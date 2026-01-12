import type React from "react";

//
//
//

interface SolvingLayoutProps {
	children: React.ReactNode;
}

//
//
//

const SolvingLayout = ({ children }: SolvingLayoutProps) => {
	return (
		<div className="relative flex flex-col items-center w-full h-full flex-1 pt-[30px] pb-[84px]">
			<div className="w-full min-w-0 flex flex-1 flex-col gap-gap-11">
				{children}
			</div>
		</div>
	);
};

export default SolvingLayout;
