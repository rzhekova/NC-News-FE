import React, { Component } from "react";
import axios from "axios";

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
    this.getUser(username).then(user => {
      this.setState({ user });
    });
  }

  getUser = username => {
    return axios
      .get(`https://rosies-ncnews.herokuapp.com/api/users/${username}`)
      .then(({ data }) => {
        return data;
      });
  };
}

export default Users;
