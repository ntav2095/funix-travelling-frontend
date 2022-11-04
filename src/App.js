// main
import { Route, Routes } from "react-router-dom";

// client pages
import ToursList from "./pages/ToursList";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Visa from "./pages/Visa";
import VisaService from "./pages/VisaService";
import TravelHandbook from "./pages/TravelHandbook";
import TravelHandbookDetail from "./pages/TravelHandbookDetail";
import TourDetail from "./pages/TourDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// admin pages
import Dashboard from "./pages/Admin/Dashboard";
import NewTour from "./pages/Admin/NewTour";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/danh-sach-tour" element={<ToursList />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/ve-cong-ty" element={<About />} />
        <Route path="/dich-vu-visa/1" element={<Visa />} />
        <Route path="/dich-vu-visa" element={<VisaService />} />
        <Route path="/cam-nang-du-lich" element={<TravelHandbook />} />
        <Route
          path="/cam-nang-du-lich/:id"
          element={<TravelHandbookDetail />}
        />
        <Route path="/danh-sach-tour/:a" element={<TourDetail />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/new-tour" element={<NewTour />} />
      </Routes>
    </>
  );
}

export default App;
