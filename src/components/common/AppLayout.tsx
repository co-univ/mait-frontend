import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

//
//
//

const AppLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div>
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
    </div>
  );
};

export default AppLayout;
