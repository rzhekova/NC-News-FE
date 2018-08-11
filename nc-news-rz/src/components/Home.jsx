import React, { Component } from "react";
import Articles from "./Articles";
import * as utils from "../utils/utils";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h3>MOST POPULAR ARTICLES</h3>
        <Articles func={utils.formatPopularArticles} />
      </div>
    );
  }
}

export default Home;
