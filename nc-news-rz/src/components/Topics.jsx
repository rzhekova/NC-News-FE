import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Topics extends Component {
  state = {
    articlesByTopic: []
  };
  render() {
    const { articlesByTopic } = this.state;
    return (
      <div>
        <ul>
          {articlesByTopic.map(article => {
            return <li key={article._id}>{article.title}</li>;
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { topic } = this.props.match.params;
    this.fetchArticlesPerTopic(topic).then(articles => {
      this.setState({ articlesByTopic: articles });
    });
  }
  componentDidUpdate(prevProps) {
    const { topic } = this.props.match.params;
    if (prevProps.match.params.topic !== topic) {
      this.fetchArticlesPerTopic(topic).then(articles => {
        this.setState({ articlesByTopic: articles });
      });
    }
  }
  fetchArticlesPerTopic = topic => {
    return axios
      .get(`https://rosies-ncnews.herokuapp.com/api/topics/${topic}/articles`)
      .then(({ data }) => {
        return data.articles;
      });
  };
}

export default Topics;
