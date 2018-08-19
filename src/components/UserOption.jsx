import React from "react";
import PT from "prop-types";

const UserOption = ({ user }) => {
  return <option value={user._id}>{user.username}</option>;
};

UserOption.propTypes = {
  user: PT.object.isRequired
};

export default UserOption;
