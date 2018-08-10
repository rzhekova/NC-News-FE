import React, { Component } from "react";
import * as api from "../api";

class User extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    return (
      <section>
        <h2>{user.name}</h2>
        <img
          onError={error => {
            error.target.src =
              "https://www.um.es/documents/1995586/0/anonymous.gif/ff0bc545-f6d4-4b8f-8bcd-3d92015d219e?t=1507214955672";
          }}
          src={`${user.avatar_url}`}
          alt={`Avatar for ${user.name}`}
        />
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

export default User;
