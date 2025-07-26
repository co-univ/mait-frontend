import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";

const App = () => {
	return (
		<BrowserRouter>
			<div className="app-container">
				{/* <Header /> */}
				<SideBar />
				<main className="main-content">
					<div className="content">
						<h1>MAIT Frontend</h1>
						<p>메인 콘텐츠 영역입니다.</p>
					</div>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default App;
