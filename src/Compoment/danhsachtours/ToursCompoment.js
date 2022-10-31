// import "tour.css";

import Header from "../Compomentchung/HeaderCompoment";
import Tour from "../Compomentchung/TourCompoment";
import Breadcrumb from "react-bootstrap/Breadcrumb";
function DANHSACHTOURS() {
  return (
    <>
      <div className="Navbar_header">
        <div className="navbar">
          <Header />
        </div>
        <div id="Body-content ">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>DANH SÁCH TOURS</Breadcrumb.Item>
          </Breadcrumb>
          <Tour />
        </div>
      </div>
    </>
  );
}

export default DANHSACHTOURS;
