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
import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";

// lang
import i18next from "../../services/languages/i18n";

// css
import styles from "./Navbar.module.css";
import "./overrideNavbar.css";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import Search from "./Search";

function Header() {
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

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const container = document.getElementById("container-navbar");
      if (document.documentElement.scrollTop > 100) {
        container.classList.add(styles.fixed);
      } else if (document.documentElement.scrollTop <= 10) {
        container.classList.remove(styles.fixed);
      }
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        document.getElementById("Btn").style.display = "block";
      } else {
        document.getElementById("Btn").style.display = "none";
      }
    });
  }, []);



  useEffect(() => {
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
      <div className={styles.navbar + " container-xl"}>
        <div id="container-navbar" className={styles.container}>
          <Navbar id="navbar" expand="lg" className="container-xl ">
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
                      <NavLink className="nav-link" to="/tours-chau-au">
                        {i18next.t("header.euTours")}
                      </NavLink>
                    </NavItem>

                    <NavItem className="nav-bar-offcanvat">
                      <NavLink className="nav-link" to="/tours-trong-nuoc">
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
                          navigation("/admin");
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
                </Offcanvas.Body>
              </Offcanvas>

              <NavbarBrand className="mr-auto" href="/">
                <h1 className={styles.logo + " fs-4 fw-bold m-0"}>
                  TRAVEL JOYA
                </h1>
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
                    <NavLink className="nav-link" to="/tours-chau-au">
                      {i18next.t("header.euTours")}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/tours-trong-nuoc">
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
                  <NavItem className={styles.langOptions}>
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
                  <NavItem className="d-flex align-items-center">
                    <Search />
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
      </div>
    </>
  );
}

export default Header;
