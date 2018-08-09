import React, { Component } from "react";
import { Link } from "react-router-dom";
import Articles from "./Articles";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <h3>Our most commented on articles:</h3>
        <Articles func={this.formatPopularArticles} />
      </div>
    );
  }

  formatPopularArticles = articleObject => {
    return (
      articleObject.comments > 10 && (
        <article>
          <div>
            <Link to={`/articles/${articleObject._id}`}>
              {articleObject.title}
            </Link>
          </div>
        </article>
      )
    );
  };
}

export default Home;
