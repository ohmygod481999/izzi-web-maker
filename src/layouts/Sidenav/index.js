import React from "react";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

function Sidenav() {
    return (
        <div className="main-sidebar sidebar-style-2">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <a href="index.html">
                        {" "}
                        <img
                            alt="image"
                            src="assets/img/logo.png"
                            className="header-logo"
                        />{" "}
                        <span className="logo-name">Otika</span>
                    </a>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header">Main</li>
                    <li className="dropdown active">
                        <Link to="/app" className="nav-link">
                            <i data-feather="monitor" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <NavItem
                        title="Widgets"
                        dropdownItems={[
                            {
                                title: "test",
                                to: "/app/test",
                            },
                            {
                                title: "b",
                                to: "/app/b",
                            },
                        ]}
                    />
                </ul>
            </aside>
        </div>
    );
}

export default Sidenav;
