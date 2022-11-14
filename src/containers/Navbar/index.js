// main
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { Component, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";

// components
import Search from "./Search";

// lang
import i18next from "../../services/languages/i18n";

// css
import styles from "./Navbar.module.css";
import "./overrideNavbar.css";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";

function Header() {
  const [lazy] = useLazyLoading(loadingImg);
  const [state, setState] = useState({
    isNavOpen: false,
    search: "",
    show: false,
  });

  function handleClose() {
    setState({
      show: !state.show,
    });
  }
  function handleShow() {
    setState({
      show: !state.show,
    });
  }
  function toggleNav() {
    setState({
      isNavOpen: !state.isNavOpen,
    });
  }
  function topFunction() {
    console.log("gọi hàm");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(document.documentElement.scrollTop);
      const container = document.getElementById("container-navbar");
      if (document.documentElement.scrollTop > 250) {
        console.log("add");
        container.classList.add(styles.fixed);
      } else if (document.documentElement.scrollTop <= 10) {
        console.log("remove");
        container.classList.remove(styles.fixed);
      }
      if (
        document.body.scrollTop > 250 ||
        document.documentElement.scrollTop > 250
      ) {
        document.getElementById("Btn").style.display = "block";
      } else {
        document.getElementById("Btn").style.display = "none";
      }
    });
  }, []);

  useEffect(() => {
    lazy();
  });

  return (
    <>
      <div style={{ width: "100%", height: "80px", background: "white" }}></div>
      <div id="container-navbar" className={styles.container}>
        <Navbar id="navbar" expand="lg" className={styles.navbar}>
          <div className="container">
            <NavbarToggler onClick={handleShow} />
            <Offcanvas show={state.show} onHide={handleClose}>
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav navbar>
                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/"></NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/ve-cong-ty">
                      Tổng quan công ty
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/lien-he">
                      Liên hệ
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/danh-sach-tour">
                      Du lịch châu Âu
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/danh-sach-tour">
                      Du lịch trong nước
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/dich-vu-visa">
                      Visa
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/cam-nang-du-lich">
                      Cẩm nang du lịch
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <Search />
                  </NavItem>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>

            <NavbarBrand className="mr-auto" href="/">
              <img
                id="NavbarBrand"
                src="/asscets/img/logo_sticky1.png"
                alt="logo"
                className={styles.logo}
              />
            </NavbarBrand>

            <Collapse isOpen={state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/" end>
                    {i18next.t("header.home")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavDropdown
                    title={i18next.t("header.intro")}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <NavLink className="nav-link" to="/ve-cong-ty">
                        {i18next.t("header.about")}
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item to="/lien-he">
                      <NavLink className="nav-link" to="/lien-he">
                        {i18next.t("header.contact")}
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/tour-chau-au">
                    Du lịch châu Âu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/tour-trong-nuoc">
                    Du lịch trong nước
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/dich-vu-visa">
                    {i18next.t("header.visaService")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/cam-nang-du-lich">
                    {i18next.t("header.travelHandbook")}
                  </NavLink>
                </NavItem>
                <Search />
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <button
          onClick={topFunction}
          id="Btn"
          className={styles.btn}
          title="Go to top"
        >
          <i class="fas fa-arrow-circle-up" style={{ fontSize: "30px" }}></i>
        </button>
      </div>
    </>
  );
}

export default Header;
