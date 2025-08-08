import clsx from "clsx";
import {
	Bell,
	ChevronLeft,
	ChevronRight,
	Menu,
	Search,
	UserRound,
} from "lucide-react";
import type React from "react";
import useUser from "src/hooks/useUser";
import useLoginModalOpenStore from "src/stores/useLoginModalOpenStore";
import logo from "../../assets/logo.png";

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
		<div className="fixed left-0 top-0 z-10 flex h-24 w-full place-content-between items-center bg-color-alpha-white100 p-8">
			<div className="flex items-center gap-5">
				<BrandMenu onMenuOpen={handleMenuButtonClick} />
				<HistoryController />
			</div>
			<div className="flex items-center gap-5">
				<SearchBar />
				<UserMenu />
			</div>
		</div>
	);
};

/**
 *
 */
const BrandMenu = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
	const { user } = useUser();

	return (
		<div className="flex items-center gap-3">
			<button
				type="button"
				onClick={() => {
					window.location.href = "/";
				}}
			>
				<img className="h-6 cursor-pointer" src={logo} alt="로고" />
			</button>
			{user && <Menu className={ICON_BUTTON_STYLE} onClick={onMenuOpen} />}
		</div>
	);
};

/**
 *
 */
const HistoryController = () => {
	const { user } = useUser();

	if (!user) return null;

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
	const { user } = useUser();

	const { openLoginModal } = useLoginModalOpenStore();

	return (
		<div className="flex items-center gap-3">
			<Bell className={ICON_BUTTON_STYLE} />
			<div className="flex cursor-pointer items-center gap-3">
				<UserRound className={ICON_BUTTON_STYLE} />
				<button
					type="button"
					className="text-base text-alpha-black100 typo-body-small"
					onClick={user ? undefined : openLoginModal}
				>
					{user ? user.name : "로그인"}
				</button>
			</div>
		</div>
	);
};

export default Header;
