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
import React, { Component } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";

// components
import Search from "./Search";

// lang
import i18next from "../../services/languages/i18n";

// css
import styles from "./Navbar.module.css";
import "./overrideNavbar.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      isNavOpen: false,
      search: "",
      show: false,
    };
  }
  handleClose() {
    this.setState({
      show: !this.state.show,
    });
  }
  handleShow() {
    this.setState({
      show: !this.state.show,
    });
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  // {i18next.t("Welcome to React")}
  render() {
    return (
      <div className={styles.container}>
        <Navbar expand="lg" className={styles.navbar}>
          <div className="container">
            <NavbarToggler onClick={this.handleShow} />
            <Offcanvas show={this.state.show} onHide={this.handleClose}>
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Nav navbar>
                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/"></NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/ve-cong-ty">
                      TỔNG QUAN CÔNG TY
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/lien-he">
                      THÔNG TIN LIÊN HỆ
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/danh-sach-tour">
                      DANH SÁCH TOURS
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/dich-vu-visa">
                      DỊCH VỤ VISA
                    </NavLink>
                  </NavItem>

                  <NavItem className="nav-bar-offcanvat">
                    <NavLink className="nav-link" to="/cam-nang-du-lich">
                      CẨM NANG DU LỊCH
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

            <Collapse isOpen={this.state.isNavOpen} navbar>
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
                  <NavLink className="nav-link" to="/danh-sach-tour">
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
                <Search />
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
export default Header;
