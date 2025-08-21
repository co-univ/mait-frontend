import { ChevronLeft, ChevronRight } from "lucide-react";

//
//
//

const HeaderBrandSectionNavigator = () => {
	return (
		<div className="flex items-center gap-3">
			<ChevronLeft className="h-4 w-4 cursor-pointer text-color-gray-40" />
			<ChevronRight className="h-4 w-4 cursor-pointer text-color-alpha-black100" />
		</div>
	);
};

export default HeaderBrandSectionNavigator;
