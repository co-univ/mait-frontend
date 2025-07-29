import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AppLayout />
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
