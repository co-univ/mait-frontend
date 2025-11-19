import { Outlet } from "react-router-dom";
import LoginModal from "@/components/auth/LoginModal";
import AppLayout from "@/layouts/AppLayout";
import Toast from "./components/Toast";
import useLoginModalOpenStore from "./stores/useLoginModalOpenStore";

//
//
//

const App = () => {
	const { isLoginModalOpen, closeLoginModal } = useLoginModalOpenStore();

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
