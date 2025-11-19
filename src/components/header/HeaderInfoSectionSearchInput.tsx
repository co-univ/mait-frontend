import { Search } from "lucide-react";

//
//
//

const HeaderInfoSectionSearchInput = () => {
	return (
		<div className="flex h-5 w-[372px] items-center gap-[0.63rem] rounded-md bg-gray-5 px-padding-6 py-padding-3">
			<Search className="h-2 w-2 text-gray-30" />
			<input
				className="w-full bg-transparent text-alpha-black100 outline-none typo-body-xsmall"
				type="text"
				placeholder="문제 검색"
			/>
		</div>
	);
};

export default HeaderInfoSectionSearchInput;
