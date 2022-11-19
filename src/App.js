// main
import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
// import HomeNew from "./pages/HomeNew";
import Loading from "./components/loading";
import { LiveChat } from "./containers/Livechat";
import Category from "./pages/Admin/Category";
import DefaultLayout from "./layout/DefaultLayout";

import Navbar from "./containers/Navbar";
import Footer from "./containers/Footer";

// components

const RequireAuth = React.lazy(() => import("./components/RequireAuth"));

// client pages

const ToursList = React.lazy(() => import("./pages/ToursList"));
const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/About"));
const Visa = React.lazy(() => import("./pages/Visa"));
const VisaService = React.lazy(() => import("./pages/VisaService"));
const TravelHandbook = React.lazy(() => import("./pages/TravelHandbook"));
const TravelHandbookDetail = React.lazy(() =>
  import("./pages/TravelHandbookDetail")
);
const HomeNew = React.lazy(() => import("./pages/HomeNew"));
const TourDetail = React.lazy(() => import("./pages/TourDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
// admin pages

// tours
const NewTour = React.lazy(() => import("./pages/Admin/Tours/NewTour"));
const EditTour = React.lazy(() => import("./pages/Admin/Tours/EditTour"));
const Tours = React.lazy(() => import("./pages/Admin/Tours"));
const Posts = React.lazy(() => import("./pages/Admin/Posts"));
const NewPosts = React.lazy(() => import("./pages/Admin/Posts/newPosts"));
const EditPosts = React.lazy(() => import("./pages/Admin/Posts/editPosts"));
const UpdateItinerary = React.lazy(() =>
  import("./pages/Admin/Tours/UpdateItinerary")
);

// visa
const EditVisa = React.lazy(() => import("./pages/Admin/EditVisa"));
const AddVisa = React.lazy(() => import("./pages/Admin/AddVisa"));
const Visas = React.lazy(() => import("./pages/Admin/Visas"));

// others
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
const Login = React.lazy(() => import("./pages/Admin/Login"));

function App() {
  useEffect(() => {
    LiveChat();
  }, []);
  return (
    <>
      <Navbar />

      <div className="app">
        <div className="app__body">
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* =============================  CLIENT ROUTES ==============================  */}
              <Route path="/" element={<HomeNew />} />
              <Route path="/tour-chau-au" element={<ToursList />} />
              <Route path="/tour-trong-nuoc" element={<ToursList />} />
              <Route path="/danh-sach-tour/:tourId" element={<TourDetail />} />
              <Route path="/lien-he" element={<Contact />} />
              <Route path="/ve-cong-ty" element={<About />} />
              <Route path="/dich-vu-visa/1" element={<Visa />} />
              <Route path="/dich-vu-visa" element={<VisaService />} />
              <Route path="/cam-nang-du-lich" element={<TravelHandbook />} />
              <Route path="/*" element={<NotFound />} />
              <Route
                path="/cam-nang-du-lich/:id"
                element={<TravelHandbookDetail />}
              />

              {/* =============================  ADMIN ROUTES ==============================  */}
              <Route path="/admin/login" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/category" element={<Category />} />

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
                {/* posts */}
                <Route path="/admin/posts" element={<Posts />} />
                <Route path="/admin/new-posts" element={<NewPosts />} />
                <Route
                  path="/admin/edit-posts/:articleId"
                  element={<EditPosts />}
                />
              </Route>
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
