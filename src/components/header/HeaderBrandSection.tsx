import mait_logo from "@/assets/images/mait-logo.svg";
import HeaderBrandSectionUserMenu from "./HeaderBrandSectionUserMenu";

//
//
//

const HeaderBrandSection = () => {
	return (
		<div className="flex items-center">
			<button
				type="button"
				onClick={() => {
					window.location.href = "/";
				}}
				className="flex items-center gap-gap-5"
			>
				<img src={mait_logo} alt="Logo" className="h-32" />
				<span className="font-lexend text-color-primary-50 text-fontsize-5 font-medium">
					MAIT
				</span>
			</button>
			<HeaderBrandSectionUserMenu />
		</div>
	);
};

export default HeaderBrandSection;
