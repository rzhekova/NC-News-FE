import React from "react";

const FilterButtons = ({ handleClick }) => {
  return (
    <div style={{ fontSize: "12px" }}>
      filter:{" "}
      <button className="filter" onClick={event => handleClick(event, "all")}>
        All
      </button>
      <button className="filter" onClick={event => handleClick(event, "votes")}>
        Highest Votes
      </button>
      <button
        className="filter"
        onClick={event => handleClick(event, "recent")}
      >
        Most Recent
      </button>
    </div>
  );
};

export default FilterButtons;
