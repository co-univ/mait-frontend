import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import useUser from "@/hooks/useUser";
import { GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE_PATHS } from "@/layouts/AppLayout";
import useSidebarOpenStore from "@/stores/useSidebarOpenStore";
import { hasValidPath } from "@/utils/path";

//
//
//

const HeaderBrandSectionUserMenu = () => {
	const { toggleSidebarOpen } = useSidebarOpenStore();
	const { user } = useUser();

	const location = useLocation();

	/**
	 *
	 */
	const handleMenuClick = () => {
		if (
			hasValidPath(
				GRADATION_SECONDARY_RADIAL_BACKGROUND_STYLE_PATHS,
				location.pathname,
			)
		) {
			return;
		}

		toggleSidebarOpen();
	};

	if (!user) {
		return null;
	}

	return (
		<div className="flex items-center">
			<div className="w-20" />
			<button type="button" onClick={handleMenuClick}>
				<Menu />
			</button>
			<div className="w-32" />
		</div>
	);
};

export default HeaderBrandSectionUserMenu;
