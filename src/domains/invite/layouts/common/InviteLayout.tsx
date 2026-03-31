import type React from "react";

//
//
//

interface InviteLayoutProps {
	children: React.ReactNode;
}

//
//
//

const InviteLayout = ({ children }: InviteLayoutProps) => {
	return (
		<div className="w-full h-full flex justify-center items-center px-5 md:px-0">
			<div className="w-full max-w-[512px] flex flex-col justify-center items-center gap-gap-11 md:gap-gap-9">
				{children}
			</div>
		</div>
	);
};

export default InviteLayout;
