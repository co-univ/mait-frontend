import {
	Bell,
	ChevronLeft,
	ChevronRight,
	Menu,
	Search,
	UserRound,
} from "lucide-react";
import type React from "react";
import logo from "@/assets/logo.png";

//
//
//

const ICON_BUTTON_STYLE = "h-4 w-4 cursor-pointer text-alpha-black100";

//
//
//

interface HeaderProps {
	isSideBarOpen: boolean;
	setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//
//
//

const Header = ({ isSideBarOpen, setIsSideBarOpen }: HeaderProps) => {
	/**
	 *
	 */
	const handleMenuButtonClick = () => {
		setIsSideBarOpen(!isSideBarOpen);
	};

	return (
		<header className="bg-alpha-white-100 flex h-24 w-full place-content-between items-center p-8">
			<div className="flex items-center gap-5">
				<BrandMenu onMenuOpen={handleMenuButtonClick} />
				<HistoryController />
			</div>
			<div className="flex items-center gap-5">
				<SearchBar />
				<UserMenu />
			</div>
		</header>
	);
};

/**
 *
 */
const BrandMenu = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
	return (
		<div className="flex items-center gap-3">
			<img className="h-6 cursor-pointer" src={logo} alt="로고" />
			<Menu className={ICON_BUTTON_STYLE} onClick={onMenuOpen} />
		</div>
	);
};

/**
 *
 */
const HistoryController = () => {
	return (
		<div className="flex items-center gap-3">
			<ChevronLeft className="h-4 w-4 cursor-pointer text-color-gray-40" />
			<ChevronRight className="h-4 w-4 cursor-pointer text-color-alpha-black100" />
		</div>
	);
};

/**
 *
 */
const SearchBar = () => {
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

/**
 *
 */
const UserMenu = () => {
	return (
		<div className="flex items-center gap-3">
			<Bell className={ICON_BUTTON_STYLE} />
			<div className="flex cursor-pointer items-center gap-3">
				<UserRound className={ICON_BUTTON_STYLE} />
				<span className="text-base text-alpha-black100 typo-body-small">
					전민쟁
				</span>
			</div>
		</div>
	);
};

export default Header;
