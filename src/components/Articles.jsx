import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import PT from "prop-types";
import List from "./List";

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
    else return <List title={this.props.title} list={this.state.articles} />;
  }

  componentDidMount() {
    const { formatPopularArticles } = this.props;
    api
      .fetchAllArticles()
      .then(allArticles => {
        let articles;
        if (formatPopularArticles) {
          articles = allArticles.filter(article => {
            return formatPopularArticles(article);
          });
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
  formatPopularArticles: PT.func,
  title: PT.string
};

export default Articles;
