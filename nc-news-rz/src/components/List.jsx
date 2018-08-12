import React from "react";
import PT from "prop-types";

const List = ({ list, func }) => {
  return (
    <ul>
      {list.map(listItem => {
        return <li key={listItem._id}>{func(listItem)}</li>;
      })}
    </ul>
  );
};

List.propTypes = {
  list: PT.arrayOf(PT.object).isRequired,
  func: PT.func.isRequired
};

export default List;
