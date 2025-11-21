import clsx from "clsx";
import { HEADER_HEIGHT } from "@/app.constants";
import HeaderBrandSection from "./HeaderBrandSection";
import HeaderInfoSection from "./HeaderInfoSection";

//
//
//

interface HeaderProps {
	isTransparentBackground: boolean;
}

//
//
//

const Header = ({ isTransparentBackground }: HeaderProps) => {
	return (
		<div
			className={clsx(
				"fixed top-0 z-10 flex w-full justify-between items-center bg-color-alpha-white100 px-padding-12",
				{
					"bg-transparent": isTransparentBackground,
				},
			)}
			style={{
				height: HEADER_HEIGHT,
			}}
		>
			<HeaderBrandSection />
			<HeaderInfoSection isHide={isTransparentBackground} />
		</div>
	);
};

export default Header;
