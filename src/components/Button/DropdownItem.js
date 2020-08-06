import React from "react";
import PropTypes from "prop-types";

function DropdownItem({ href, icon, ...props }) {
    return (
        <a
            href={href}
            {...props}
            className={`dropdown-item ${icon ? "has-icon" : ""}`}
        >
            {icon ? icon : null} {props.children}
        </a>
    );
}

DropdownItem.propTypes = {};

export default DropdownItem;
