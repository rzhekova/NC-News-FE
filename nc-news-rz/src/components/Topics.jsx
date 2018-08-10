import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import List from "./List";

class Topics extends Component {
  state = {
    articlesByTopic: [],
    errorCode: null
  };

  render() {
    const { articlesByTopic, errorCode } = this.state;
    if (errorCode) {
      return (
        <Redirect
          to={{
            pathname: `/${errorCode}`,
            state: { from: "articles" }
          }}
        />
      );
    }
    return <List list={articlesByTopic} func={this.formatArticleByTopic} />;
  }

  componentDidMount() {
    const { topic } = this.props.match.params;
    api
      .fetchArticlesByTopic(topic)
      .then(articles => {
        this.setState({ articlesByTopic: articles });
      })
      .catch(error => this.setState({ errorCode: error.response.status }));
  }
  componentDidUpdate(prevProps) {
    const { topic } = this.props.match.params;
    if (prevProps.match.params.topic !== topic) {
      api.fetchArticlesByTopic(topic).then(articles => {
        this.setState({ articlesByTopic: articles });
      });
    }
  }

  formatArticleByTopic = articleOject => {
    return (
      <Link to={`/articles/${articleOject._id}`}>{articleOject.title}</Link>
    );
  };
}

export default Topics;
