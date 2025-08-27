import { HEADER_HEIGHT } from "@/app.constants";
import HeaderBrandSection from "./HeaderBrandSection";
import HeaderInfoSection from "./HeaderInfoSection";

//
//
//

const Header = () => {
	return (
		<div
			className="sticky top-0 z-10 flex w-full justify-between items-center bg-color-alpha-white100 px-padding-12"
			style={{
				height: HEADER_HEIGHT,
			}}
		>
			<HeaderBrandSection />
			<HeaderInfoSection />
		</div>
	);
};

export default Header;
