// main
import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GoToTop from "./components/GoToTop";
import { liveChat } from "./containers/Livechat";
import Category from "./pages/Admin/Category";
import Terms from "./pages/Admin/Terms";
import DefaultLayout from "./layout/DefaultLayout";
import Term from "./pages/Term";
import AboutManager from "./pages/Admin/AboutManager";

import Spinner from "./components/Spinner";
import EditCatModal from "./pages/Admin/Category/EditCatModal";
import ArticleCategory from "./pages/articleCategory";
import TourRating from "./pages/Admin/Tours/Rating";
import BannerManager from "./pages/Admin/BannerManager";
import Users from "./pages/Admin/Users";
import CreateUser from "./pages/Admin/Users/CreateUser";
import ChangePassword from "./pages/Admin/Users/ChangePassword";
// components

const RequireAuth = React.lazy(() => import("./components/RequireAuth"));

// client pages

const ToursList = React.lazy(() => import("./pages/tourList"));
const Contact = React.lazy(() => import("./pages/Contact"));
const About = React.lazy(() => import("./pages/About"));
const Visa = React.lazy(() => import("./pages/Visa"));
const VisaService = React.lazy(() => import("./pages/VisaService"));
const TravelHandbook = React.lazy(() => import("./pages/Articles"));
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
const EditVisa = React.lazy(() => import("./pages/Admin/Visas/EditVisa"));
const AddVisa = React.lazy(() => import("./pages/Admin/Visas/AddVisa"));
const Visas = React.lazy(() => import("./pages/Admin/Visas"));

// others
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
const Login = React.lazy(() => import("./pages/Admin/Login"));

function App() {
  useEffect(() => {
    setTimeout(() => {
      liveChat();
    }, 2000);
  }, []);
  return (
    <>
      <GoToTop />
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <h1 style={{ color: "red", margin: "30px" }}>{error.message}</h1>
        )}
      >
        <Suspense fallback={<Spinner show={true} />}>
          <Routes>
            {/* =============================  CLIENT ROUTES ==============================  */}
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomeNew />} />
              <Route
                path="/tours-chau-au"
                element={<ToursList cat_params={{ cat_not: "vi" }} />}
              />
              <Route
                path="/tours-trong-nuoc"
                element={<ToursList cat_params={{ cat: "vi" }} />}
              />
              <Route path="/danh-sach-tour/:tourId" element={<TourDetail />} />
              <Route path="/lien-he" element={<Contact />} />
              <Route path="/gioi-thieu" element={<About />} />
              <Route path="/dich-vu-visa/1" element={<Visa />} />
              <Route path="/dich-vu-visa" element={<VisaService />} />
              <Route path="/cam-nang-du-lich" element={<TravelHandbook />} />
              <Route path="/dieu-khoan/:type" element={<Term />} />

              <Route path="/*" element={<NotFound />} />
              <Route
                path="/cam-nang-du-lich/:articleId"
                element={<TravelHandbookDetail />}
              />
              <Route
                path="/cam-nang-du-lich/danh-muc/:id"
                element={<ArticleCategory />}
              />
            </Route>

            {/* =============================  ADMIN ROUTES ==============================  */}
            <Route path="/admin/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/category" element={<Category />}>
                <Route
                  path="/admin/category/edit-cat/:catId"
                  element={<EditCatModal />}
                />
              </Route>

              {/* tour  */}
              <Route path="/admin/new-tour" element={<NewTour />} />
              <Route path="/admin/rate-tour/:tourId" element={<TourRating />} />
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

              {/* terms  */}
              <Route path="/admin/terms" element={<Terms />} />
              <Route path="/admin/about" element={<AboutManager />} />

              {/* users */}
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/users/create-user" element={<CreateUser />} />
              <Route
                path="/admin/users/change-password/:username"
                element={<ChangePassword />}
              />

              {/* layout */}
              <Route path="/admin/banner" element={<BannerManager />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
