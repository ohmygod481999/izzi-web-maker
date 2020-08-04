import React from "react";
import PropTypes from "prop-types";

function Card({ statistic, ...props }) {
    return (
        <div className="card">
            {statistic ? (
                <div className="card-statistic-4">{props.children}</div>
            ) : (
                props.children
            )}
        </div>
    );
}

Card.propTypes = {};

export default Card;
