import clsx from "clsx";

//
//
//

interface QuestionSetsCardRootProps {
	children: React.ReactNode;
	className?: string;
}

//
//
//

const QuestionSetsCardRoot = ({
	children,
	className,
}: QuestionSetsCardRootProps) => {
	return (
		<div
			className={clsx(
				"flex flex-col gap-gap-10 p-padding-11 border border-color-gray-10 rounded-medium1 bg-color-alpha-white100",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default QuestionSetsCardRoot;
