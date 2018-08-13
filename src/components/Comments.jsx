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
        <div className="white-background">
          {comments[0] && (
            <h4>Comments for "{comments[0].belongs_to.title}"</h4>
          )}
          <List list={comments} func={this.formatComments} />
          <h3>Join the conversation</h3>
          <AddComment handleSubmit={this.handleSubmit} />
        </div>
      );
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    api
      .fetchCommentsByArticleId(articleId)
      .then(comments => {
        comments.sort((a, b) => {
          return a["created_at"].localeCompare(b["created_at"]);
        });
        this.setState({
          comments
        });
      })
      .catch(error => this.setState({ errorCode: error.response.status }));
  }

  formatComments = commentObject => {
    return (
      <main>
        <p>
          "<i>{commentObject.body}</i>"
        </p>
        <p>{utils.formatDate(commentObject.created_at)}</p>
        <span>
          <p>
            posted by:{" "}
            <Link to={`/users/${commentObject.created_by.username}`}>
              {commentObject.created_by.username}
            </Link>
          </p>
          <p>
            <button
              className="vote-up"
              disabled={this.state.isDisabled}
              onClick={() => this.handleVote("up", commentObject._id)}
            >
              <i className="fas fa-arrow-up" />
            </button>
            {commentObject.votes}
            <button
              disabled={this.state.isDisabled}
              onClick={() => this.handleVote("down", commentObject._id)}
            >
              <i className="fas fa-arrow-down" />
            </button>
          </p>
        </span>
        <button
          style={{ border: "1px solid rgb(167, 167, 167)", marginLeft: "0" }}
          onClick={() => this.handleDelete(commentObject._id)}
        >
          Delete
        </button>
        <hr />
      </main>
    );
  };

  handleVote = (query, commentId) => {
    let isDisabled;
    api.updateVoteCount(query, commentId, "comments");
    const comments = this.state.comments.map(comment => {
      if (comment._id === commentId) {
        isDisabled = true;
        return {
          ...comment,
          votes:
            query === "up"
              ? comment.votes + 1
              : query === "down"
                ? comment.votes - 1
                : comment.votes
        };
      } else {
        isDisabled = false;
        return comment;
      }
    });
    this.setState({
      comments,
      isDisabled
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
