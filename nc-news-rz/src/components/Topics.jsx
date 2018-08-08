import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
    this.fetchArticlesByTopic(topic).then(articles => {
      this.setState({ articlesByTopic: articles });
    });
  }
  componentDidUpdate(prevProps) {
    const { topic } = this.props.match.params;
    if (prevProps.match.params.topic !== topic) {
      this.fetchArticlesByTopic(topic).then(articles => {
        this.setState({ articlesByTopic: articles });
      });
    }
  }
  fetchArticlesByTopic = topic => {
    return axios
      .get(`https://rosies-ncnews.herokuapp.com/api/topics/${topic}/articles`)
      .then(({ data }) => {
        return data.articles;
      });
  };

  formatArticleByTopic = articleOject => {
    return (
      <Link to={`/articles/${articleOject._id}`}>{articleOject.title}</Link>
    );
  };
}

export default Topics;
