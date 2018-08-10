import React, { Component } from "react";
import * as api from "../api";
import AllArticles from "./AllArticles";
import { Redirect } from "react-router-dom";

class Articles extends Component {
  state = {
    articles: [],
    errorCode: null
  };

  render() {
    const { errorCode } = this.state;
    if (errorCode)
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    else return <AllArticles articles={this.state.articles} />;
  }

  componentDidMount() {
    api
      .fetchAllArticles()
      .then(allArticles => {
        let articles;
        if (this.props.func) {
          articles = allArticles.filter(article => this.props.func(article));
        } else {
          articles = allArticles;
        }
        this.setState({ articles });
      })
      .catch(error => {
        this.setState({ errorCode: error.response.status });
      });
  }
}

export default Articles;
