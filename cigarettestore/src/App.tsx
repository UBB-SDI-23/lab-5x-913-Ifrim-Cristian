import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Cigarettes from "./pages/Cigarettes/Cigarettes";
import NoPage from "./pages/NoPage/NoPage";
import Brands from "./pages/Brands/Brands";
import Clients from "./pages/Clients/Clients";
import PriceStatistics from "./pages/Statistics/PriceStatistics";
import NicotineStatistics from "./pages/Statistics/NicotineStatistics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cigarettes" element={<Cigarettes />} />
        <Route path="brands" element={<Brands />} />
        <Route path="price-statistics" element={<PriceStatistics />} />
        <Route path="nicotine-statistics" element={<NicotineStatistics />} />
        <Route path="clients" element={<Clients />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
