import React from "react";

const List = ({ list, func }) => {
  return (
    <ul>
      {list.map(listItem => {
        return <li key={listItem._id}>{func(listItem)}</li>;
      })}
    </ul>
  );
};

export default List;
