import MaitLogo from "@/assets/images/mait-logo.svg";
import useBreakpoint from "@/hooks/useBreakpoint";
import HeaderMenu from "./HeaderMenu";

//
//
//

const HeaderBrandSection = () => {
	const { isSm } = useBreakpoint();

	return (
		<div className="flex items-center">
			<button
				type="button"
				onClick={() => {
					window.location.href = "/";
				}}
				className="flex items-center gap-gap-5"
			>
				<MaitLogo />
				<span className="font-lexend text-color-primary-50 text-fontsize-5 font-medium">
					MAIT
				</span>
			</button>
			<div className="w-20" />
			{isSm && <HeaderMenu />}
		</div>
	);
};

export default HeaderBrandSection;
