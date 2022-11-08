import React, { Component } from "react";
import Search from "./Search";
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

// css
import "./Navbar.css";
import styles from "./Navbar.module.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      search: "",
    };
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.container}>
          <Navbar dark expand="lg ">
            <div className="container">
              <NavbarToggler onClick={this.toggleNav} />
              <NavbarBrand className="mr-auto" href="/">
                <img
                  src="/asscets/img/logo_sticky1.png"
                  height="50px"
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
                      {/* <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item> */}
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
                      VISA
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
                  {/* <Search /> */}
                </Nav>
              </Collapse>
            </div>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}
export default Header;
