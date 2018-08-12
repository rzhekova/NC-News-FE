import React, { Component } from "react";
import * as api from "../api";
import AllArticles from "./AllArticles";
import { Redirect } from "react-router-dom";
import PT from "prop-types";

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
    const { func } = this.props;
    api
      .fetchAllArticles()
      .then(allArticles => {
        let articles;
        if (func) {
          articles = allArticles.filter(article => func(article));
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

Articles.propTypes = {
  func: PT.func
};

export default Articles;
