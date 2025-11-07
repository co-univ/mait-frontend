import type React from "react";

//
//
//

interface CreationQuestionLayoutProps {
	children: React.ReactNode;
}

const CreationQuestionLayout = ({ children }: CreationQuestionLayoutProps) => {
	return (
		<div className="py-padding-12 flex h-full w-full justify-center gap-[106px] md:gap-[60px]">
			{children}
		</div>
	);
};

export default CreationQuestionLayout;
