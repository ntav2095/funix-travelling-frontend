import './HeaderComponent.css'
import React, { Component } from "react";
import SearchCompoment from './seachCompoment'
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
    console.log(this.props.style)
    return (
      <React.Fragment>
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
                      color: this.props.style?this.props.style:'black' 
                    }}
                  >
                    TRANG CHỦ
                  </NavLink>
                </NavItem >
                <NavItem style={{ color: this.props.style?this.props.style:'black' }}>
                <NavDropdown title="GIỚI THIỆU"  id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    <NavLink className="nav-link" style={{ color: this.props.style?this.props.style:'black' }} to="/TONGQUAN">
                      TỔNG QUAN CÔNG TY
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <NavLink className="nav-link" style={{ color: this.props.style?this.props.style:'black' }} to="/LIENHE">
                      THÔNG TIN LIÊN HỆ
                    </NavLink>
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item> */}
                </NavDropdown>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" style={{ color: this.props.style?this.props.style:'black' }} to="/TOURSLIST">
                    DANH SÁCH TOURS
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" style={{ color: this.props.style?this.props.style:'black' }} to="/VISA">
                    DỊCH VỤ VISA
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" style={{ color: this.props.style?this.props.style:'black' }} to="/CAMNANG">
                    CẨM NANG DU LỊCH
                  </NavLink>
                </NavItem>
                <SearchCompoment />
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default Header;
