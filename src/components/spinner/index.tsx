import React from "react";
import propTypes from "prop-types";
import PropTypes from "prop-types";
import "./style.scss";

function Spinner(props: any) {
  if (props.active) {
    return (
      <div className="Spinner">
        <div className="load"></div>
        <div className="overlay"></div>
        {props.children}
      </div>
    );
  } else {
    return props.children;
  }
}

Spinner.propTypes = {
  active: propTypes.bool.isRequired,
  children: PropTypes.node,
};

export default React.memo(Spinner);
