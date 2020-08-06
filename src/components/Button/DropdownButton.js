import React from "react";
import PropTypes from "prop-types";

function DropdownButton({ title, color = "warning", ...props }) {
    return (
        <div className={`dropdown ${props.className}`} {...props}>
            <a
                href="#"
                data-toggle="dropdown"
                className={`btn btn-${color} dropdown-toggle`}
            >
                {title}
            </a>
            <div className="dropdown-menu">{props.children}</div>
        </div>
    );
}

DropdownButton.propTypes = {};

export default DropdownButton;
