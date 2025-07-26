import type React from "react";
import { useNavigate } from "react-router-dom";

//
//
//

interface MenuItemProps {
	icon: (className: string) => React.ReactNode;
	label: string;
	path: string;
}

//
//
//

const SideBarNavigationMenuItem = ({ icon, label, path }: MenuItemProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleMenuClick = () => {
		navigate(path);
	};

	return (
		<button type="button" onClick={handleMenuClick}>
			<div className="group flex items-center gap-[0.625rem] p-3 rounded-[0.375rem] hover:bg-primary-5">
				{icon("w-5 h-5 text-gray-30 group-hover:text-primary-50")}
				<span className="text-gray-30 text-base group-hover:text-primary-50 group-hover:font-bold">
					{label}
				</span>
			</div>
		</button>
	);
};

export default SideBarNavigationMenuItem;
