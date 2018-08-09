import React, { Component } from "react";
import * as api from "../api";
import List from "./List";
import { Link } from "react-router-dom";

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
        <input type="text" placeholder="add a comment" />
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
      </main>
    );
  };

  handleVote = (query, commentId) => {
    api.updateVoteCount(query, commentId, "comments");
    this.setState({
      voteChange:
        query === "up"
          ? this.state.voteChange + 1
          : query === "down"
            ? this.state.voteChange - 1
            : this.state.voteChange
    });
  };
}

export default Comments;
