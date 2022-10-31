// import "tour.css";

import Header from "../../layout/HeaderCompoment";
import Goituvan from "./Giotuvan";
import Mota from "./Mota";
function TourDetail() {
  return (
    <>
      <div className="Navbar_header">
        <div className="navbar">
          <Header />
        </div>
        <div id="Body-content ">
          <Goituvan />
          <Mota />
        </div>
      </div>
    </>
  );
}

export default TourDetail;
