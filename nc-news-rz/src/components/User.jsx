import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import PT from "prop-types";

class User extends Component {
  state = {
    user: {},
    errorCode: null
  };

  render() {
    const { user, errorCode } = this.state;
    if (errorCode)
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    else
      return (
        <section className="user">
          <h2>{user.name}</h2>
          <p>username: {user.username}</p>
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
    api
      .fetchUser(username)
      .then(user => {
        this.setState({ user });
      })
      .catch(error => this.setState({ errorCode: error.response.status }));
  }
}

User.propTypes = {
  match: PT.shape({
    params: PT.shape({
      username: PT.string.isRequired
    })
  })
};

export default User;
