import React from "react";

const List = ({ list, property }) => {
  return (
    <ul>
      {list.map(listItem => {
        return <li key={listItem.id}>{listItem[property]}</li>;
      })}
    </ul>
  );
};

export default List;
