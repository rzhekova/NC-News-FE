import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import * as utils from "../utils/utils";
import PT from "prop-types";

class SingleArticle extends Component {
  state = {
    articleById: {},
    voteChange: 0,
    isDisabled: false,
    errorCode: null
  };

  render() {
    const { articleById, voteChange, errorCode } = this.state;
    if (errorCode)
      return (
        <Redirect
          to={{ pathname: `/${errorCode}`, state: { from: "articles" } }}
        />
      );
    else
      return (
        <article className="white-background">
          {articleById.title && (
            <div>
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
                <button
                  disabled={this.state.isDisabled}
                  onClick={() => this.handleVote("up")}
                >
                  <i className="fas fa-arrow-up" />
                </button>
                {articleById.votes + voteChange}
                <button
                  disabled={this.state.isDisabled}
                  onClick={() => this.handleVote("down")}
                >
                  <i className="fas fa-arrow-down" />
                </button>
              </p>

              <p>
                Comments:{" "}
                <Link to={`/${articleById._id}/comments`}>
                  {articleById.comments}
                </Link>
              </p>
            </div>
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
    const { articleId } = this.props.match.params;
    api.updateVoteCount(query, articleId, "articles");
    this.setState({
      isDisabled: true,
      voteChange:
        query === "up"
          ? this.state.voteChange + 1
          : query === "down"
            ? this.state.voteChange - 1
            : this.state.voteChange
    });
  };
}

SingleArticle.propTypes = {
  match: PT.shape({
    params: PT.shape({
      articleId: PT.string.isRequired
    })
  })
};

export default SingleArticle;
