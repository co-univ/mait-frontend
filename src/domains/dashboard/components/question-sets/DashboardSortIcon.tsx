import clsx from "clsx";

//
//
//

type SortDirection = "asc" | "desc" | null;

interface DashboardSortIconProps {
	direction: SortDirection;
}

//
//
//

const DashboardSortIcon = ({ direction }: DashboardSortIconProps) => {
	return (
		<svg
			width="15"
			height="16"
			viewBox="0 0 15 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<polygon
				points="7.5,0 15,7 0,7"
				className={clsx(
					direction === "asc" ? "fill-color-primary-50" : "fill-color-gray-30",
				)}
			/>
			<polygon
				points="7.5,16 15,9 0,9"
				className={clsx(
					direction === "desc"
						? "fill-color-primary-50"
						: "fill-color-gray-30",
				)}
			/>
		</svg>
	);
};

export default DashboardSortIcon;
