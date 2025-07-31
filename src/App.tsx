import "./App.css";
import Solving from "./pages/solving/pages";

const App = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen ">
			<div className="h-[96px] bg-primary-50 w-full"></div>
			<Solving />
		</div>
	);
};

export default App;
