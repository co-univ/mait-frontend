import { Outlet } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Toast from "./components/Toast";

//
//
//

const App = () => {
	return (
		<>
			<AppLayout>
				<Outlet />
			</AppLayout>
			<Toast />
		</>
	);
};

export default App;
