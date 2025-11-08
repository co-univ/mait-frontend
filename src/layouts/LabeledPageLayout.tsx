import type React from "react";

//
//
//

interface LabeledPageLayoutProps {
	icon: React.ReactNode;
	label: string;
	rightContent?: React.ReactNode;
	children: React.ReactNode;
}

//
//
//

const LabeledPageLayout = ({
	icon,
	label,
	rightContent,
	children,
}: LabeledPageLayoutProps) => {
	return (
		<div className="flex flex-col gap-gap-11 py-padding-12">
			<div className="flex gap-gap-5 items-center">
				<span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
				<h1 className="typo-heading-medium">{label}</h1>

				<span className="flex-grow" />

				{rightContent}
			</div>

			<div>{children}</div>
		</div>
	);
};

export default LabeledPageLayout;
