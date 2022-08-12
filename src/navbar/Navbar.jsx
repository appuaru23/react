import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, NavItem, Container, NavDropdown } from 'react-bootstrap';
const NavbarNavigation = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">User List
        </a>
        <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/adduser"} className="nav-link">
                    Add User
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/adduser"} className="nav-link">
                    Home Page
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                    Dashboard
                </Link>
            </li>
        </div>
      </nav>
    </div>
  );
};

export default NavbarNavigation;
