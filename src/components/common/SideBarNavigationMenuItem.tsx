import clsx from "clsx";
import type React from "react";
import { useNavigate } from "react-router-dom";

//
//
//

interface MenuItemProps {
	icon: (className: string) => React.ReactNode;
	label: string;
	path: string;
	selected: boolean;
	onSelect: () => void;
}

//
//
//

const SideBarNavigationMenuItem = ({
	icon,
	label,
	path,
	selected,
	onSelect,
}: MenuItemProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleMenuClick = () => {
		onSelect();
		navigate(path);
	};

	return (
		<button type="button" onClick={handleMenuClick}>
			<div
				className={clsx(
					"group flex items-center gap-[0.625rem] p-3 rounded-[0.375rem] hover:bg-primary-5",
					{ "bg-primary-5": selected },
				)}
			>
				{icon(
					clsx("w-5 h-5", {
						"text-primary-50": selected,
						"text-gray-30 group-hover:text-primary-50": !selected,
					}),
				)}
				<span
					className={clsx("text-base", {
						"text-primary-50 font-bold": selected,
						"text-gray-30 group-hover:text-primary-50 group-hover:font-bold":
							!selected,
					})}
				>
					{label}
				</span>
			</div>
		</button>
	);
};

export default SideBarNavigationMenuItem;
