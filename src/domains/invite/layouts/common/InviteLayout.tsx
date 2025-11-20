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
		<div className="w-full h-full flex justify-center items-center">
			<div className="w-[512px] flex flex-col justify-center items-center gap-gap-9">
				{children}
			</div>
		</div>
	);
};

export default InviteLayout;
