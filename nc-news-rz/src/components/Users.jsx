import React, { Component } from "react";
import * as api from "../api";

class Users extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    return (
      <section>
        <h2>{user.name}</h2>
        <img src={`${user.avatar_url}`} alt={`Avatar for ${user.name}`} />
      </section>
    );
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    api.fetchUser(username).then(user => {
      this.setState({ user });
    });
  }
}

export default Users;
