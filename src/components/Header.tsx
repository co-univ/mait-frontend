import {
	Bell,
	ChevronLeft,
	ChevronRight,
	Menu,
	Search,
	UserRound,
} from "lucide-react";
import React from "react";
import logoSymbol from "../assets/logo_symbol.png";

//
//
//

const Header = () => {
	return (
		<div className="bg-alpha-white-100 flex place-content-between w-full h-24 items-center p-8 fixed top-0 left-0 ">
			<div className="flex items-center gap-[4.5rem]">
				<div className="flex items-center gap-[0.63rem]">
					<img
						className="w-8 h-8 cursor-pointer"
						src={logoSymbol}
						alt="심볼 로고"
					/>
					<Menu className="w-6 h-6 text-alpha-black-100 cursor-pointer" />
				</div>
				<div className="flex items-center gap-5">
					<ChevronLeft className="w-6 h-6 text-alpha-black-100 cursor-pointer" />
					<ChevronRight className="w-6 h-6 text-alpha-black-100 cursor-pointer" />
				</div>
			</div>
			<div className="flex items-center gap-5">
				<div className="w-96 h-8 bg-gray-5 rounded-md flex items-center px-3 py-[0.38rem] gap-[0.63rem]">
					<Search className="w-5 h-5 text-gray-30" />
					<input
						className="outline-none bg-transparent text-alpha-black-100 w-full"
						type="text"
						placeholder="문제 검색"
					/>
				</div>
				<Bell className="w-6 h-6 text-alpha-black-100 cursor-pointer" />
				<UserRound className="w-6 h-6 text-alpha-black-100 cursor-pointer" />
				<span className="text-alpha-black-100 text-base">전민쟁</span>
			</div>
		</div>
	);
};

export default Header;
