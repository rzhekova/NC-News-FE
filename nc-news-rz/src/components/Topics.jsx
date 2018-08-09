import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import List from "./List";

class Topics extends Component {
  state = {
    articlesByTopic: []
  };

  render() {
    const { articlesByTopic } = this.state;
    return <List list={articlesByTopic} func={this.formatArticleByTopic} />;
  }

  componentDidMount() {
    const { topic } = this.props.match.params;
    api.fetchArticlesByTopic(topic).then(articles => {
      this.setState({ articlesByTopic: articles });
    });
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
