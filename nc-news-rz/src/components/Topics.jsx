import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as api from "../api";
import * as utils from "../utils/utils";
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
    return <List list={articlesByTopic} func={utils.formatArticleByTopic} />;
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
}

export default Topics;
