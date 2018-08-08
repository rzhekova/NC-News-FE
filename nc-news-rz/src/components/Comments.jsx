import React, { Component } from "react";
import axios from "axios";
import List from "./List";

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    const { comments } = this.state;
    return <List list={comments} func={this.formatComments} />;
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    this.fetchCommentsByArticleId(articleId).then(comments => {
      this.setState({
        comments
      });
    });
  }

  fetchCommentsByArticleId = articleId => {
    return axios
      .get(
        `https://rosies-ncnews.herokuapp.com/api/articles/${articleId}/comments`
      )
      .then(({ data }) => {
        return data.comments;
      });
  };

  formatComments = commentObject => {
    return commentObject.body;
  };
}

export default Comments;
