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
		<div className="relative flex flex-col items-center w-full h-full flex-1 mt-5 mb-32 px-[10.75rem]">
			<div className="w-full max-w-[1096px] min-w-0 flex flex-1 flex-col">
				{children}
			</div>
		</div>
	);
};

export default SolvingLayout;
