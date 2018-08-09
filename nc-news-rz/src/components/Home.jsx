import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddArticle from "./AddArticle";
import Articles from "./Articles";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Articles func={this.formatPopularArticles} />
        <AddArticle />
      </div>
    );
  }

  formatPopularArticles = articleObject => {
    return (
      articleObject.comments > 10 && (
        <div>
          <Link to={`/articles/${articleObject._id}`}>
            {articleObject.title}
          </Link>
        </div>
      )
    );
  };
}

export default Home;
