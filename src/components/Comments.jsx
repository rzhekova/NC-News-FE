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
    errorCode: null
  };
  render() {
    const { comments, errorCode } = this.state;
    if (errorCode === 400)
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    else
      return (
        <div className="white-background">
          {comments.length > 0 ? (
            <div>
              <h4>Comments for "{comments[0].belongs_to.title}"</h4>
              <List list={comments} func={this.formatComments} />
              <h3>Join the conversation</h3>
            </div>
          ) : (
            <h4>Be the first to post a comment</h4>
          )}
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
              onClick={() => this.handleVote("up", commentObject._id)}
            >
              <i className="fas fa-arrow-up" />
            </button>
            {commentObject.votes}
            <button onClick={() => this.handleVote("down", commentObject._id)}>
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
      } else {
        return comment;
      }
    });
    this.setState({
      comments
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
        })
        .catch(error => alert("This article does not exist"));
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
