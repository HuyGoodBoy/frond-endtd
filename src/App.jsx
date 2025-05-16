// 2.50.0
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ChatBot from "./components/ChatBot";
import FAQPage from "./pages/FAQPage"
import IssuePage from "./pages/IssuePage";
import CVEvaluationPage from "./pages/CVEvaluationPage";
import CompanyEvaluationPage from "./pages/CompanyEvaluationPage";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
// import ImgGen from "./components/ImgGen";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { decode as atob, encode as btoa } from "js-base64";
// import { themeChange } from 'theme-change'
function App() {
  useEffect(() => {}, []);
  const [currentPage, SetCurrentPage] = useState("Home");
  return (
    <HashRouter>
      <div className="overflow-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/issue" element={<IssuePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cv-evaluation" element={<CVEvaluationPage />} />
          <Route path="/jd-evaluation" element={<CompanyEvaluationPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
