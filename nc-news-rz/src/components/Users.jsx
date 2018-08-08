import React, { Component } from "react";

class Users extends Component {
  state = {
    users: [
      { id: 1, username: "user1", name: "Bill", avatar: "user1.jpg" },
      { id: 2, username: "user2", name: "Jane", avatar: "user2.jpg" }
    ]
  };
  render() {
    const { username } = this.props;
    return (
      <div>
        <header>
          <h2>{username}</h2>
        </header>
        {this.getUser(username)}
      </div>
    );
  }

  getUser = username => {
    const usersCopy = [...this.state.users];
    const user = usersCopy.filter(user => user.username === username)[0];
    return (
      <main>
        <p>Name: {user.name}</p>
        <p>Picture: {user.avatar}</p>
      </main>
    );
  };
}

export default Users;
