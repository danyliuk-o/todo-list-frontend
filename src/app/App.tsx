import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/Home.js";
import About from "../pages/about/About.js";

import "../styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
