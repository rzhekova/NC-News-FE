import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import AddComment from "./AddComment";
import PT from "prop-types";

import SingleComment from "./SingleComment";

class Comments extends Component {
  state = {
    comments: [],
    commentIds: [],
    errorCode: null
  };
  render() {
    const { comments, errorCode, commentIds } = this.state;
    if (errorCode) {
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    } else
      return (
        <div className="white-background">
          {comments[0] ? (
            <div className="comments">
              <h3 style={{ textAlign: "center", marginBottom: "6vh" }}>
                Comments for "{comments[0].belongs_to.title}"
              </h3>
              {comments.map(comment => {
                return (
                  <SingleComment
                    key={comment._id}
                    commentIds={commentIds}
                    handleVote={this.handleVote}
                    handleDelete={this.handleDelete}
                    commentObject={comment}
                  />
                );
              })}
              <h4>Join the conversation</h4>
            </div>
          ) : (
            <h3>Be the first to post a comment</h3>
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
      .catch(error => {
        this.setState({ errorCode: error.response.status });
      });
  }

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
      comments,
      commentIds: [...this.state.commentIds, commentId]
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
          this.setState({
            comments: [...this.state.comments, comment]
          });
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
