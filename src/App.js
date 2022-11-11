// main
import { Route, Routes } from "react-router-dom";

// components
import RequireAuth from "./components/RequireAuth";

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

// tours
import NewTour from "./pages/Admin/NewTour";
import EditTour from "./pages/Admin/EditTour";
import Tours from "./pages/Admin/Tours";
import AddItinerary from "./pages/Admin/AddItinerary";
import Posts from "./pages/Admin/Posts";
import NewPosts from "./pages/Admin/Posts/newPosts";
import EditPosts from "./pages/Admin/Posts/editPosts";
import UpdateItinerary from "./pages/Admin/UpdateItinerary";
// visa
import EditVisa from "./pages/Admin/EditVisa";
import AddVisa from "./pages/Admin/AddVisa";
import Visas from "./pages/Admin/Visas";

// others
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import ScrollToTop from "./components/ScrollToTop";

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
        <Route path="/danh-sach-tour/:tourId" element={<TourDetail />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/admin/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Dashboard />} />

          {/* tour  */}
          <Route path="/admin/new-tour" element={<NewTour />} />
          <Route path="/admin/edit-tour/:tourId" element={<EditTour />} />
          <Route path="/admin/tours" element={<Tours />} />
          <Route
            path="/admin/update-itinerary/:tourId"
            element={<UpdateItinerary />}
          />

          {/* visa  */}
          <Route path="/admin/visa-products" element={<Visas />} />
          <Route path="/admin/add-visa-product" element={<AddVisa />} />
          <Route
            path="/admin/edit-visa-product/:visaId"
            element={<EditVisa />}
          />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/admin/new-posts" element={<NewPosts />} />
          <Route path="/admin/edit-posts/:postsId" element={<EditPosts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
