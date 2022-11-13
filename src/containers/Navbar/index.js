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
import React, { Component, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import styles from "./Navbar.module.css";
import "./overrideNavbar.css";

function Header(){
   
    const [state,setState]= useState({
      isNavOpen: false,
      search: "",
      show: false,
    })
  
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
useEffect(() => {
  window.addEventListener('scroll',()=>{
    console.log(document.documentElement.scrollTop)
    const container=document.getElementById('container-navbar')
    if(document.documentElement.scrollTop>250){
      console.log('add')
      container.classList.add(styles.fixed)
    }else if(document.documentElement.scrollTop<=10){
      console.log('remove')
      container.classList.remove(styles.fixed)
      
    }
  })
  
}, [])



    return (
      <>
      <div style={{width:'100%',height:'80px',background: 'white'}}></div>
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
                      TRANG CHỦ
                    </NavLink>
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

            <Collapse isOpen={state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/" end>
                    TRANG CHỦ
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavDropdown title="GIỚI THIỆU" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      <NavLink className="nav-link" to="/ve-cong-ty">
                        TỔNG QUAN CÔNG TY
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      <NavLink className="nav-link" to="/lien-he">
                        THÔNG TIN LIÊN HỆ
                      </NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/danh-sach-tour">
                    DANH SÁCH TOURS
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/dich-vu-visa">
                    DỊCH VỤ VISA
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/cam-nang-du-lich">
                    CẨM NANG DU LỊCH
                  </NavLink>
                </NavItem>
                <Search />
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
      </>
    );
  }

export default Header;
