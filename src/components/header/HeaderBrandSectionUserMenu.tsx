import { Menu } from "lucide-react";
import useUser from "@/hooks/useUser";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import HeaderBrandSectionUserMenuNavigator from "./HeaderBrandSectionUserMenuNavigator";

//
//
//

const HeaderBrandSectionUserMenu = () => {
	const { toggleSidebarOpen } = useSidebarOpenStore();
	const { user } = useUser();

	if (!user) {
		return null;
	}

	return (
		<div className="flex items-center">
			<div className="w-20" />
			<button type="button" onClick={toggleSidebarOpen}>
				<Menu />
			</button>
			<div className="w-32" />
			<HeaderBrandSectionUserMenuNavigator />
		</div>
	);
};

export default HeaderBrandSectionUserMenu;
