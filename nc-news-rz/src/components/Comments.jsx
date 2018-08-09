import React, { Component } from "react";
import * as api from "../api";
import List from "./List";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

class Comments extends Component {
  state = {
    comments: [],
    voteChange: 0
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
    const { voteChange } = this.state;
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
            {commentObject.votes + voteChange}
            <button onClick={() => this.handleVote("down", commentObject._id)}>
              -
            </button>
          </p>
        </span>
        <button>Delete</button>
        <hr />
      </main>
    );
  };

  handleVote = (query, commentId) => {
    api.updateVoteCount(query, commentId, "comments");
    const comments = this.state.comments.map(comment => {
      if (comment._id === commentId) {
        console.log(comment);
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
}

export default Comments;
