import Search from "./Search";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import "./reponsi.css";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, Component } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";

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
  render() {
    return (
      <div id="Body-content-1">
        <React.Fragment>
          <Navbar dark expand="lg">
            <div className="container">
              <NavbarToggler onClick={this.handleShow} />
              <Offcanvas show={this.state.show} onHide={this.handleClose}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav navbar>
                    <NavItem className="nav-bar-offcanvat">
                      <NavLink
                        className="nav-link"
                        to="/"
                        style={{
                          color: this.props.style ? this.props.style : "black",
                        }}
                      >
                        TRANG CHỦ
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className="nav-bar-offcanvat"
                      style={{
                        color: this.props.style ? this.props.style : "black",
                      }}
                    >
                      <NavLink
                        className="nav-link"
                        style={{
                          color: this.props.style ? this.props.style : "black",
                        }}
                        to="/ve-cong-ty"
                      >
                        TỔNG QUAN CÔNG TY
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className="nav-bar-offcanvat"
                      style={{
                        color: this.props.style ? this.props.style : "black",
                      }}
                    >
                      <NavLink
                        className="nav-link"
                        style={{
                          color: this.props.style ? this.props.style : "black",
                        }}
                        to="/lien-he"
                      >
                        THÔNG TIN LIÊN HỆ
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-bar-offcanvat">
                      <NavLink
                        className="nav-link"
                        style={{
                          color: this.props.style ? this.props.style : "black",
                        }}
                        to="/danh-sach-tour"
                      >
                        DANH SÁCH TOURS
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-bar-offcanvat">
                      <NavLink
                        className="nav-link"
                        style={{
                          color: this.props.style ? this.props.style : "black",
                        }}
                        to="/dich-vu-visa"
                      >
                        DỊCH VỤ VISA
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-bar-offcanvat">
                      <NavLink
                        className="nav-link"
                        style={{
                          color: this.props.style ? this.props.style : "black",
                        }}
                        to="/cam-nang-du-lich"
                      >
                        CẨM NANG DU LỊCH
                      </NavLink>
                    </NavItem>
                    <Search />
                  </Nav>
                </Offcanvas.Body>
              </Offcanvas>
              <NavbarBrand className="mr-auto" href="/">
                <img
                  id="NavbarBrand"
                  src="/asscets/img/logo_sticky1.png"
                  height="30vw"
                  // width="200px"
                  alt="logo"
                />
              </NavbarBrand>
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link"
                      to="/"
                      style={{
                        color: this.props.style ? this.props.style : "black",
                      }}
                    >
                      TRANG CHỦ
                    </NavLink>
                  </NavItem>
                  <NavItem
                    style={{
                      color: this.props.style ? this.props.style : "black",
                    }}
                  >
                    <NavDropdown title="GIỚI THIỆU" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        <NavLink
                          className="nav-link"
                          style={{
                            color: this.props.style
                              ? this.props.style
                              : "black",
                          }}
                          to="/ve-cong-ty"
                        >
                          TỔNG QUAN CÔNG TY
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        <NavLink
                          className="nav-link"
                          style={{
                            color: this.props.style
                              ? this.props.style
                              : "black",
                          }}
                          to="/lien-he"
                        >
                          THÔNG TIN LIÊN HỆ
                        </NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link"
                      style={{
                        color: this.props.style ? this.props.style : "black",
                      }}
                      to="/danh-sach-tour"
                    >
                      DANH SÁCH TOURS
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link"
                      style={{
                        color: this.props.style ? this.props.style : "black",
                      }}
                      to="/dich-vu-visa"
                    >
                      DỊCH VỤ VISA
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link"
                      style={{
                        color: this.props.style ? this.props.style : "black",
                      }}
                      to="/cam-nang-du-lich"
                    >
                      CẨM NANG DU LỊCH
                    </NavLink>
                  </NavItem>
                  <Search />
                </Nav>
              </Collapse>
            </div>
          </Navbar>
        </React.Fragment>
      </div>
    );
  }
}
export default Header;
