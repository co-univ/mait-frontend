import "./App.css";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoginModal from "@/components/auth/LoginModal";
import AppLayout from "@/layouts/AppLayout";
import type { SIDEBAR_VARIANT } from "./components/common/SideBar";
import Toast from "./components/common/Toast";
import useLoginModalOpenStore from "./stores/useLoginModalOpenStore";

//
//
//

const App = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);

	const { isLoginModalOpen, closeLoginModal } = useLoginModalOpenStore();

	const location = useLocation();

	const sidebarVariant: SIDEBAR_VARIANT = location.pathname.startsWith(
		"/quiz-solving",
	)
		? "overlay"
		: "default";

	useEffect(() => {
		if (location.pathname.startsWith("/quiz-solving")) {
			setIsSideBarOpen(false);
		}
	}, [location.pathname]);

	return (
		<>
			<AppLayout>
				<Outlet />
			</AppLayout>
			<LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
			<Toast />
		</>
	);
};

export default App;
