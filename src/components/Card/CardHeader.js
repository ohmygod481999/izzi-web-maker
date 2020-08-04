import React from "react";
import PropTypes from "prop-types";

function CardHeader({ title, headerAction, ...props }) {
    return (
        <div className="card-header">
            <h4>{title}</h4>
            {headerAction ? (
                <div className="card-header-action">{headerAction}</div>
            ) : null}
        </div>
    );
}

CardHeader.propTypes = {};

export default CardHeader;
