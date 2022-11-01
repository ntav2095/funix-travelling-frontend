/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { Switch, Route, Redirect, Routes } from "react-router-dom";

import DANHSACHTOURS from "./page/danhsachtours/ToursCompoment";
import Footer from "./layout/FooterCompoment";
import Thongtinlienhe from "./page/gioithieu/ThongtinlienheCompoment";
import TongquanCT from "./page/gioithieu/TongquanCompoment";
import VISA from "./page/Divuvisa/VisaCompoment";
import CamnangTour from "./page/camnangdulich/CamnangCompoment";
import TourDetail from "./page/danhsachtours/Tourdetailcopoment";
import IndividualIntervalsExample from "./Compoment/HomeComponent/SLIDERCOmpoment";
import Home from "./page/trangchu/TrangchuCompoment";
class Main extends Component {
  constructor(prop) {
    super(prop);
    this.state = "";
  }

  render() {
    return (
      <div className="body_container">
        <Routes>
          <Route path="/" element={<Home />} />
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
