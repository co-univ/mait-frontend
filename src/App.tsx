import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Toast from "./components/Toast";
import Loading from "./pages/Loading";

const App = () => {
	return (
		<>
			<AppLayout>
				<Suspense fallback={<Loading />}>
					<Outlet />
				</Suspense>
			</AppLayout>
			<Toast />
		</>
	);
};

export default App;
