import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import * as utils from "../utils/utils";
import PT from "prop-types";
import List from "./List";

class Articles extends Component {
  state = {
    articles: [],
    filteredArticles: [],
    isLoading: true,
    errorCode: null
  };

  render() {
    const { errorCode, filteredArticles, articles, isLoading } = this.state;
    if (errorCode)
      return (
        <Redirect to={{ pathname: `/${errorCode}`, state: { from: "home" } }} />
      );
    else
      return (
        <List
          handleClick={this.handleClick}
          list={!filteredArticles[0] ? articles : filteredArticles}
          isLoading={isLoading}
        />
      );
  }

  componentDidMount() {
    api
      .fetchAllArticles()
      .then(articles => {
        this.setState({ articles, isLoading: false });
      })
      .catch(error => {
        this.setState({ errorCode: error.response.status });
      });
  }

  handleClick = (event, filter) => {
    event.preventDefault();
    const allArticles = [...this.state.articles];
    if (filter === "votes") {
      const filteredByVote = allArticles
        .filter(article => {
          return utils.formatPopularArticles(article);
        })
        .sort((a, b) => b.votes - a.votes);
      this.setState({ filteredArticles: filteredByVote });
    } else if (filter === "recent") {
      const recentArticles = allArticles
        .sort((a, b) => {
          return b["created_at"].localeCompare(a["created_at"]);
        })
        .slice(0, 6);
      this.setState({ filteredArticles: recentArticles });
    } else if (filter === "all") {
      this.setState({ filteredArticles: allArticles });
    }
  };
}

Articles.propTypes = {
  formatPopularArticles: PT.func,
  title: PT.string
};

export default Articles;
