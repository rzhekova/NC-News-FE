import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

const Error400 = ({ location }) => {
  return (
    <div className="white-background">
      {location.state.from && (
        <div>
          <h4>There are no articles here</h4>
          <button style={{ border: "1px solid black" }} className="error">
            <Link to={"/"}>Back to homepage</Link>
          </button>
        </div>
      )}
    </div>
  );
};

Error400.propTypes = {
  location: PT.shape({
    state: PT.shape({
      from: PT.string
    })
  })
};

export default Error400;
