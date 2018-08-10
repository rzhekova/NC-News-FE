import React, { Component } from "react";
import * as api from "../api";
import * as utils from "../utils/utils";
import AllArticles from "./AllArticles";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    return <AllArticles articles={this.state.articles} />;
  }

  componentDidMount() {
    api.fetchAllArticles().then(allArticles => {
      let articles;
      if (this.props.func) {
        articles = allArticles.filter(article =>
          utils.formatPopularArticles(article)
        );
      } else {
        articles = allArticles;
      }
      this.setState({ articles });
    });
  }
}

export default Articles;
