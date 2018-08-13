import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

const Error404 = props => {
  return (
    <div className="white-background">
      <h3>404 - Page not found</h3>
      <button style={{ border: "1px solid black" }} className="error">
        <Link to={props.location.state ? `/${props.location.state.from}` : "/"}>
          Back to {props.location.state ? "articles" : "home"}
        </Link>
      </button>
    </div>
  );
};

Error404.propTypes = {
  location: PT.shape({
    state: PT.shape({
      from: PT.string
    })
  })
};

export default Error404;
