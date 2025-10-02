import type React from "react";

//
//
//

interface CreationLayoutProps {
	children: React.ReactNode;
}

const CreationLayout = ({ children }: CreationLayoutProps) => {
	return (
		<div className="py-padding-12 flex h-full w-full justify-center gap-[106px] md:gap-[60px]">
			{children}
		</div>
	);
};

export default CreationLayout;
