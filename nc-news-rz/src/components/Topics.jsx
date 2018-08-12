import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as api from "../api";
import * as utils from "../utils/utils";
import List from "./List";
import PT from "prop-types";

class Topics extends Component {
  state = {
    articlesByTopic: [],
    errorCode: null
  };

  render() {
    const { articlesByTopic, errorCode } = this.state;
    if (errorCode)
      return (
        <Redirect
          to={{
            pathname: `/${errorCode}`,
            state: { from: "articles" }
          }}
        />
      );
    else
      return (
        <div className="white-background">
          <List list={articlesByTopic} func={utils.formatArticleByTopic} />
        </div>
      );
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

Topics.propTypes = {
  match: PT.shape({
    params: PT.shape({
      topic: PT.string.isRequired
    })
  })
};

export default Topics;
