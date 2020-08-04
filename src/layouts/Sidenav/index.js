import React from "react";
import NavItem from "./NavItem";

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
                        <a href="index.html" className="nav-link">
                            <i data-feather="monitor" />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <NavItem
                        title="Widgets"
                        dropdownItems={[
                            {
                                title: "a",
                                to: "/a",
                            },
                            {
                                title: "b",
                                to: "/b",
                            },
                        ]}
                    />
                </ul>
            </aside>
        </div>
    );
}

export default Sidenav;
