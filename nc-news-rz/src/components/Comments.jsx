import React, { Component } from "react";
import * as api from "../api";
import List from "./List";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    const { comments } = this.state;
    return (
      <div>
        <List list={comments} func={this.formatComments} />
        <AddComment articleId={this.props.match.params.articleId} />
      </div>
    );
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    api.fetchCommentsByArticleId(articleId).then(comments => {
      this.setState({
        comments
      });
    });
  }

  formatComments = commentObject => {
    return (
      <main>
        <p>"{commentObject.body}"</p>
        <span>
          <p>
            posted by:{" "}
            <Link to={`/users/${commentObject.created_by.username}`}>
              {commentObject.created_by.username}
            </Link>
          </p>
          <p>
            votes:{" "}
            <button onClick={() => this.handleVote("up", commentObject._id)}>
              +
            </button>
            {commentObject.votes}
            <button onClick={() => this.handleVote("down", commentObject._id)}>
              -
            </button>
          </p>
        </span>
        <button onClick={() => this.handleDelete(commentObject._id)}>
          Delete
        </button>
        <hr />
      </main>
    );
  };

  handleVote = (query, commentId) => {
    api.updateVoteCount(query, commentId, "comments");
    const comments = this.state.comments.map(comment => {
      if (comment._id === commentId) {
        return {
          ...comment,
          votes:
            query === "up"
              ? comment.votes + 1
              : query === "down"
                ? comment.votes - 1
                : comment.votes
        };
      } else return comment;
    });
    this.setState({
      comments
    });
  };

  handleDelete = commentId => {
    const comments = this.state.comments.filter(comment => {
      if (comment._id === commentId) {
        return api.deleteComment(commentId);
      } else return comment;
    });
    this.setState({ comments });
  };
}

export default Comments;
