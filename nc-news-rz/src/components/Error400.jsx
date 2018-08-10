import React from "react";
import { Link } from "react-router-dom";

const Error400 = props => {
  console.log(props.location.state.from);
  return (
    <div>
      <h4>There are no {props.location.state.from} here</h4>
      {props.location.state.from && (
        <button>
          <Link to={`/articles`}>Back to articles</Link>
        </button>
      )}
    </div>
  );
};

export default Error400;
