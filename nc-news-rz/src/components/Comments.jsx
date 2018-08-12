import React, { Component } from "react";
import * as api from "../api";
import * as utils from "../utils/utils";
import List from "./List";
import { Link, Redirect } from "react-router-dom";
import AddComment from "./AddComment";
import PT from "prop-types";

class Comments extends Component {
  state = {
    comments: [],
    isDisabled: false,
    errorCode: null
  };
  render() {
    const { comments, errorCode } = this.state;
    if (errorCode)
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    else
      return (
        <div>
          {comments[0] && (
            <h3>Comments for "{comments[0].belongs_to.title}"</h3>
          )}
          <List list={comments} func={this.formatComments} />
          <AddComment handleSubmit={this.handleSubmit} />
        </div>
      );
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    api
      .fetchCommentsByArticleId(articleId)
      .then(comments => {
        this.setState({
          comments
        });
      })
      .catch(error => this.setState({ errorCode: error.response.status }));
  }

  formatComments = commentObject => {
    return (
      <main>
        <p>"{commentObject.body}"</p>
        <p>{utils.formatDate(commentObject.created_at)}</p>
        <span>
          <p>
            posted by:{" "}
            <Link to={`/users/${commentObject.created_by.username}`}>
              {commentObject.created_by.username}
            </Link>
          </p>
          <p>
            votes:{" "}
            <button
              disabled={this.state.isDisabled}
              onClick={() => this.handleVote("up", commentObject._id)}
            >
              +
            </button>
            {commentObject.votes}
            <button
              disabled={this.state.isDisabled}
              onClick={() => this.handleVote("down", commentObject._id)}
            >
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
      comments,
      isDisabled: true
    });
  };

  handleDelete = commentId => {
    const comments = this.state.comments.filter(comment => {
      if (comment._id === commentId) {
        api.deleteComment(commentId);
        return false;
      } else return comment;
    });
    this.setState({ comments });
  };

  handleSubmit = (event, created_by, body) => {
    event.preventDefault();
    if (created_by && body) {
      api
        .addComment(this.props.match.params.articleId, { created_by, body })
        .then(comment => {
          this.setState({ comments: [...this.state.comments, comment] });
        });
    } else {
      alert("Please fill in all the fields to post a comment");
    }
  };
}

Comments.propTypes = {
  match: PT.shape({
    params: PT.shape({
      articleId: PT.string.isRequired
    })
  })
};

export default Comments;
