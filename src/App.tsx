import "./App.css";
import { Outlet } from "react-router-dom";
import AppLayout from "@/components/common/AppLayout";
import Toast from "@/components/common/Toast";

//
//
//

const App = () => {
	return (
		<div>
			<Toast />
			<AppLayout>
				<Outlet />
			</AppLayout>
		</div>
	);
};

export default App;
