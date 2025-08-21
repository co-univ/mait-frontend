import HeaderBrandSection from "./HeaderBrandSection";
import HeaderInfoSection from "./HeaderInfoSection";

//
//
//

const Header = () => {
	return (
		<div className="sticky top-0 z-10 flex h-size-height-14 w-full justify-between items-center bg-color-alpha-white100 p-8">
			<HeaderBrandSection />
			<HeaderInfoSection />
		</div>
	);
};

export default Header;
