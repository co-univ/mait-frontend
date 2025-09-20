import type React from "react";

//
//
//

interface CreationLayoutProps {
	children: React.ReactNode;
}

const CreationLayout = ({ children }: CreationLayoutProps) => {
	return (
		<div className="pt-5 flex h-full w-full justify-center gap-[106px]">
			{children}
		</div>
	);
};

export default CreationLayout;
