import type React from "react";
import Header from "@/components/common/Header";
import SideBar, { type SIDEBAR_VARIANT } from "@/components/common/SideBar";

//
//
//

interface AppLayoutProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: SIDEBAR_VARIANT;
}

//
//
//

const AppLayout = ({
  isSideBarOpen,
  setIsSideBarOpen,
  variant,
}: AppLayoutProps) => {
  return (
    <div>
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <SideBar isSideBarOpen={isSideBarOpen} variant={variant} />
    </div>
  );
};

export default AppLayout;
