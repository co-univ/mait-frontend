import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import SonnerToast from "./components/SonnerToast";
import Toast from "./components/Toast";
import Loading from "./pages/Loading";
import { useScrollToHash } from "./hooks/useScrollToHash";

const App = () => {
	useScrollToHash();
	
	return (
		<>
			<AppLayout>
				<Suspense fallback={<Loading />}>
					<Outlet />
				</Suspense>
			</AppLayout>
			<Toast />
			<SonnerToast />
		</>
	);
};

export default App;
