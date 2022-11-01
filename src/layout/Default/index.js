import Footer from "../../containers/Footer";
import Navbar from "../../containers/Navbar";

function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default DefaultLayout;
