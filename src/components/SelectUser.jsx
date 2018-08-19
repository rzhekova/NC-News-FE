import React, { Component } from "react";
import * as api from "../api";
import PT from "prop-types";
import UserOption from "./UserOption";

class SelectUser extends Component {
  state = {
    users: []
  };
  render() {
    const { handleChange } = this.props;
    const { users } = this.state;
    return (
      <select
        onChange={event => handleChange(event.target.value, "created_by")}
      >
        <option>Choose a username</option>
        {users.map(user => {
          return <UserOption key={user._id} user={user} />;
        })}
      </select>
    );
  }

  componentDidMount() {
    api.fetchAllUsers().then(users => this.setState({ users }));
  }
}

SelectUser.propTypes = {
  handleChange: PT.func.isRequired
};

export default SelectUser;
