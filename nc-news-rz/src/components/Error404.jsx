import React from "react";
import { Link } from "react-router-dom";

const Error404 = props => {
  return (
    <div>
      <h3>404 - Page not found</h3>
      <button>
        <Link to={props.location.state ? `/${props.location.state.from}` : "/"}>
          Back to {props.location.state ? "articles" : "home"}
        </Link>
      </button>
    </div>
  );
};

export default Error404;
