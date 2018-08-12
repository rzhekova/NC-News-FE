import React from "react";
import PT from "prop-types";

const SelectUser = ({ handleChange }) => {
  return (
    <select onChange={event => handleChange(event.target.value, "created_by")}>
      <option>Choose a username</option>
      <option value="5b6c9b8531e69542532c5b0a">jessjelly</option>
      <option value="5b6c9b8531e69542532c5b07">happyamy2016</option>
      <option value="5b6c9b8531e69542532c5b06">grumpy19</option>
      <option value="5b6c9b8531e69542532c5b08">cooljmessy</option>
      <option value="5b6c9b8531e69542532c5b09">weegembump</option>
      <option value="5b6c9b8531e69542532c5b05">tickle122</option>
    </select>
  );
};

SelectUser.propTypes = {
  handleChange: PT.func.isRequired
};

export default SelectUser;
