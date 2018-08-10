import React, { Component } from "react";
import Articles from "./Articles";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h3>Our most commented on articles:</h3>
        <Articles />
      </div>
    );
  }
}

export default Home;
