import React, { Component } from "react";
import Articles from "./Articles";
import * as utils from "../utils/utils";

class Home extends Component {
  render() {
    return (
      <div>
        <Articles title={"POPULAR"} func={utils.formatPopularArticles} />
      </div>
    );
  }
}

export default Home;
