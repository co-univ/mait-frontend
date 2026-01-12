import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { HEADER_HEIGHT } from "@/app.constants";
import HeaderBrandSection from "./HeaderBrandSection";
import HeaderInfoSection from "./HeaderInfoSection";

//
//
//

interface HeaderProps {
	isTransparentBackground?: boolean;
}

//
//
//

const Header = ({ isTransparentBackground }: HeaderProps) => {
	const location = useLocation();

	const isHomePage = location.pathname === "/";

	return (
		<header
			className={clsx(
				"fixed top-0 z-10 flex w-full justify-between items-center bg-color-alpha-white100 px-padding-12",
				{
					"bg-transparent": isTransparentBackground,
					absolute: isHomePage,
				},
			)}
			style={{
				height: HEADER_HEIGHT,
			}}
		>
			<HeaderBrandSection />
			<HeaderInfoSection isHide={isTransparentBackground} />
		</header>
	);
};

export default Header;
