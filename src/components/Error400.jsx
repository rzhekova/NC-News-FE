import React from "react";
import { Link } from "react-router-dom";
import PT from "prop-types";

const Error400 = ({ location }) => {
  return (
    <div className="white-background">
      <h4>There are no {location.state.from} here</h4>
      {location.state.from && (
        <button style={{ border: "1px solid black" }} className="error">
          <Link to={`/articles`}>Back to articles</Link>
        </button>
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
