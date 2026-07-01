import clsx from "clsx";
import type React from "react";

//
//
//

interface LabeledPageLayoutProps {
	icon: React.ReactNode;
	label: React.ReactNode;
	rightContent?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

//
//
//

const LabeledPageLayout = ({
	icon,
	label,
	rightContent,
	children,
	className,
}: LabeledPageLayoutProps) => {
	return (
		<div className="h-full w-full flex justify-center">
			<div
				className={clsx(
					"h-full w-full flex flex-col gap-gap-11 py-padding-12",
					className,
				)}
			>
				<div className="flex gap-gap-5 items-center">
					<span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
					<h1 className="typo-heading-medium">{label}</h1>

					<span className="flex-grow" />

					{rightContent}
				</div>

				<div className="h-full w-full">{children}</div>
			</div>
		</div>
	);
};

export default LabeledPageLayout;
