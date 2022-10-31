/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { Switch, Route, Redirect, Routes } from "react-router-dom";
import IndividualIntervalsExample from "./trangchu/SLIDERCOmpoment";
import DANHSACHTOURS from "./danhsachtours/ToursCompoment";
import Footer from "./Compomentchung/FooterCompoment";
import Thongtinlienhe from "./gioithieu/ThongtinlienheCompoment";
import TongquanCT from "./gioithieu/TongquanCompoment";
import VISA from "./Divuvisa/VisaCompoment";
import CamnangTour from "./camnangdulich/CamnangCompoment";
import TourDetail from "./danhsachtours/Tourdetailcopoment";
class Main extends Component {
  constructor(prop) {
    super(prop);
    this.state = "";
  }
  render() {
    return (
      <div className="body_container">
        <Routes>
          <Route path="/" element={<IndividualIntervalsExample />} />
          <Route path="/TOURSLIST" element={<DANHSACHTOURS />} />
          <Route path="/LIENHE" element={<Thongtinlienhe />} />
          <Route path="/TONGQUAN" element={<TongquanCT />} />
          <Route path="/VISA" element={<VISA />} />
          <Route path="/CAMNANG" element={<CamnangTour />} />
          <Route path="/TOURSLIST/:a/e" element={<TourDetail />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}
export default Main;
