import { Menu } from "lucide-react";
import mait_logo from "@/assets/images/mait-logo.svg";
import useUser from "@/hooks/useUser";
import HeaderBrandSectoinNavigator from "./HeaderBrandSectoinNavigator";

//
//
//

const HeaderBrandSection = () => {
	const { user } = useUser();

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

			{user && (
				<div className="flex items-center">
					<div className="w-20" />
					<Menu />
					<div className="w-32" />
					<HeaderBrandSectoinNavigator />
				</div>
			)}
		</div>
	);
};

export default HeaderBrandSection;
