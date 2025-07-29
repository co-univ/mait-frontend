import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  UserRound,
} from "lucide-react";
import type React from "react";
import logoSymbol from "../../assets/logo_symbol.png";

//
//
//

const ICON_BUTTON_STYLE = "h-6 w-6 cursor-pointer text-alpha-black-100";

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
    setIsSideBarOpen(true);
  };

  /**
   *
   */
  const renderHeaderShort = () => {
    if (!isSideBarOpen) {
      return;
    }

    return (
      <div className="fixed left-0 top-0 flex h-24 w-full place-content-between items-center bg-alpha-white-100 p-8 transition-all delay-100 duration-300 ease-in-out">
        <div className="ml-[17.5rem] flex items-center gap-[4.5rem]">
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
  const renderHeaderFull = () => {
    if (isSideBarOpen) {
      return;
    }

    return (
      <div className="fixed left-0 top-0 flex h-24 w-full place-content-between items-center bg-alpha-white-100 p-8">
        <div className="flex items-center gap-[4.5rem]">
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

  return (
    <div>
      {renderHeaderShort()}
      {renderHeaderFull()}
    </div>
  );
};

/**
 *
 */
const BrandMenu = ({ onMenuOpen }: { onMenuOpen: () => void }) => {
  return (
    <div className="flex items-center gap-[0.63rem]">
      <img
        className="h-8 w-8 cursor-pointer"
        src={logoSymbol}
        alt="심볼 로고"
      />
      <Menu
        className="h-6 w-6 cursor-pointer text-alpha-black-100"
        onClick={onMenuOpen}
      />
    </div>
  );
};

/**
 *
 */
const HistoryController = () => {
  return (
    <div className="flex items-center gap-5">
      <ChevronLeft className={ICON_BUTTON_STYLE} />
      <ChevronRight className={ICON_BUTTON_STYLE} />
    </div>
  );
};

/**
 *
 */
const SearchBar = () => {
  return (
    <div className="flex h-8 w-96 items-center gap-[0.63rem] rounded-md bg-gray-5 px-3 py-[0.38rem]">
      <Search className="h-5 w-5 text-gray-30" />
      <input
        className="w-full bg-transparent text-alpha-black-100 outline-none"
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
    <div className="flex items-center gap-5">
      <Bell className="h-6 w-6 cursor-pointer text-alpha-black-100" />
      <div className="flex cursor-pointer items-center gap-5">
        <UserRound className={ICON_BUTTON_STYLE} />
        <span className="text-base text-alpha-black-100">전민쟁</span>
      </div>
    </div>
  );
};

export default Header;
