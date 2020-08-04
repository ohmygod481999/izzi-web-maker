import React from "react";
import { Link } from "react-router-dom";

function NavItem({ title, to, dropdownItems }) {
    return (
        <li className="dropdown">
            <Link
                to={to}
                className={`menu-toggle nav-link ${
                    dropdownItems ? "has-dropdown" : ""
                }`}
            >
                <i data-feather="briefcase" />
                <span>{title}</span>
            </Link>
            {dropdownItems ? (
                <ul className="dropdown-menu">
                    {dropdownItems.map((dropdownItem, i) => (
                        <li key={i}>
                            <Link className="nav-link" to={dropdownItem.to}>
                                {dropdownItem.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
        </li>
    );
}

export default NavItem;
