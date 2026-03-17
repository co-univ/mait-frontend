import type React from "react";

//
//
//

interface DashboardMySolvingRowProps {
	label: string;
	children: React.ReactNode;
}

//
//
//

const DashboardMySolvingRow = ({
	label,
	children,
}: DashboardMySolvingRowProps) => {
	return (
		<div className="flex justify-between">
			<p className="typo-body-large">{label}</p>
			{children}
		</div>
	);
};

export default DashboardMySolvingRow;
