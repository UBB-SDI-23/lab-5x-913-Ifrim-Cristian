import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Cigarettes from "./pages/Cigarettes/Cigarettes";
import NoPage from "./pages/NoPage/NoPage";
import Brands from "./pages/Brands/Brands";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cigarettes" element={<Cigarettes />} />
        <Route path="brands" element={<Brands />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
