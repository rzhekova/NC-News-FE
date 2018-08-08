import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  state = {
    user: {}
  };
  render() {
    const { user } = this.state;
    console.log(user);
    console.log("rendering");
    return (
      <div>
        <section>
          <h2>{user.name}</h2>
          <img src={`${user.avatar_url}`} alt="" />
        </section>
      </div>
    );
  }

  componentDidMount() {
    console.log("mounting");
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
