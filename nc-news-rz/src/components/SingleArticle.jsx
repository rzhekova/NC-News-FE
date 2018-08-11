import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import * as utils from "../utils/utils";

class SingleArticle extends Component {
  state = {
    articleById: {},
    voteChange: 0,
    errorCode: null
  };

  render() {
    const { articleById, voteChange, errorCode } = this.state;
    if (errorCode) {
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    }
    return (
      <article>
        {articleById.title && (
          <section>
            <h3>{articleById.title}</h3>
            <p>{utils.formatDate(articleById.created_at)}</p>
            <p>
              by:{" "}
              <Link to={`/users/${articleById.created_by.username}`}>
                {articleById.created_by.username}
              </Link>
            </p>
            {articleById.body}
            <p>
              <button onClick={() => this.handleVote("up")}>+</button>
              {articleById.votes + voteChange}
              <button onClick={() => this.handleVote("down")}>-</button>
            </p>

            <p>
              Comments:{" "}
              <Link to={`/${articleById._id}/comments`}>
                {articleById.comments}
              </Link>
            </p>
          </section>
        )}
      </article>
    );
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    api
      .fetchArticlesById(articleId)
      .then(article => {
        this.setState({
          articleById: article
        });
      })
      .catch(error => {
        this.setState({ errorCode: error.response.status });
      });
  }

  handleVote = query => {
    api.updateVoteCount(query, this.props.match.params.articleId, "articles");
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
export default SingleArticle;
