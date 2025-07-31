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
		<div className="flex flex-col items-center h-full flex-1 mt-5 mb-32 px-padding-12 w-full">
			<div className="w-full max-w-[1096px] min-w-0 flex flex-1 flex-col justify-between">
				{children}
			</div>
		</div>
	);
};

export default SolvingLayout;
