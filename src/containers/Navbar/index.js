// main
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigation = useNavigate();
  const [state, setState] = useState({
    isNavOpen: false,
    search: "",
    show: false,
  });
  const { i18n } = useTranslation();
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

  useEffect(() => {
    console.log("lag", i18n.language);
    if (i18n.language === "vi") {
      document.getElementById("btnvn").style.display = "none";
      document.getElementById("btnen").style.display = "block";
    } else {
      document.getElementById("btnen").style.display = "none";
      document.getElementById("btnvn").style.display = "block";
    }
  }, [i18n.language]);

  return (
    <>
      {/* <div style={{ width: "100%", height: "80px", background: "white" }}></div> */}
      <div id="container-navbar" className={styles.container}>
        <Navbar id="navbar" expand="lg" className={styles.navbar}>
          <div className="container">
            <NavbarToggler onClick={handleShow} />
            <Offcanvas show={state.show} onHide={handleClose}>
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav navbar>
                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/">
                      {i18next.t("header.home")}
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/ve-cong-ty">
                      {i18next.t("header.about")}
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/lien-he">
                      {i18next.t("header.contact")}
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/danh-sach-tour">
                      {i18next.t("header.euTours")}
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/danh-sach-tour">
                      {i18next.t("header.viTours")}
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/dich-vu-visa">
                      {i18next.t("header.visaService")}
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/cam-nang-du-lich">
                      {i18next.t("header.travelHandbook")}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <button
                      id="btnvn"
                      className={
                        styles.vi +
                        " " +
                        (i18n.language === "vi" ? styles.active : undefined)
                      }
                      style={{ display: "inline-block" }}
                      onClick={() => {
                        i18n
                          .changeLanguage("vi")
                          .then()
                          .catch((err) => console.error(err));
                      }}
                    >
                      VN
                    </button>
                    <button
                      id="btnen"
                      className={
                        styles.en +
                        " " +
                        (i18n.language === "en" ? styles.active : undefined)
                      }
                      onClick={() => {
                        i18n
                          .changeLanguage("en")
                          .then(() => console.log(2))
                          .catch((err) => console.error(err));
                      }}
                    >
                      EN
                    </button>

                    <button
                      className={styles.admin}
                      onClick={() => {
                        navigation("./admin");
                      }}
                    >
                      {" "}
                      <i
                        className="fas fa-user-cog"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </button>
                  </NavItem>

                  <NavItem>
                    <Search />
                  </NavItem>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>

            <NavbarBrand className="mr-auto" href="/">
              <h1 className={styles.logo}>TRAVEL LOGO</h1>
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
                    {i18next.t("header.euTours")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/tour-trong-nuoc">
                    {i18next.t("header.viTours")}
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
                <NavItem>
                  <Search />
                </NavItem>
                <NavItem>
                  <button
                    id="btnvn"
                    className={
                      styles.vi +
                      " " +
                      (i18n.language === "vi" ? styles.active : undefined)
                    }
                    onClick={() => {
                      i18n
                        .changeLanguage("vi")
                        .then()
                        .catch((err) => console.error(err));
                    }}
                  >
                    VN
                  </button>
                  <button
                    id="btnen"
                    className={
                      styles.en +
                      " " +
                      (i18n.language === "en" ? styles.active : undefined)
                    }
                    onClick={() => {
                      i18n
                        .changeLanguage("en")
                        .then(() => console.log(2))
                        .catch((err) => console.error(err));
                    }}
                  >
                    EN
                  </button>
                </NavItem>
                <NavItem>
                  <button
                    className={styles.admin}
                    onClick={() => {
                      navigation("./admin");
                    }}
                  >
                    {" "}
                    <i
                      className="fas fa-user-cog"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </button>
                </NavItem>
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
          <i
            className="fas fa-arrow-circle-up"
            style={{ fontSize: "30px" }}
          ></i>
        </button>
      </div>
    </>
  );
}

export default Header;
