import React from "react";

const UserOption = ({ user }) => {
  return <option value={user._id}>{user.username}</option>;
};

export default UserOption;
