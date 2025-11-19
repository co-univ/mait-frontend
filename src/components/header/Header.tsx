import clsx from "clsx";
import { HEADER_HEIGHT } from "@/app.constants";
import HeaderBrandSection from "./HeaderBrandSection";
import HeaderInfoSection from "./HeaderInfoSection";

//
//
//

interface HeaderProps {
	isAccountPage: boolean;
}

//
//
//

const Header = ({ isAccountPage }: HeaderProps) => {
	return (
		<div
			className={clsx(
				"fixed top-0 z-10 flex w-full justify-between items-center bg-color-alpha-white100 px-padding-12",
				{
					"bg-transparent": isAccountPage,
				},
			)}
			style={{
				height: HEADER_HEIGHT,
			}}
		>
			<HeaderBrandSection />
			<HeaderInfoSection isHide={isAccountPage} />
		</div>
	);
};

export default Header;
