import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SingleArticle extends Component {
  state = {
    articleById: {}
  };

  render() {
    const { articleById } = this.state;
    return (
      <article>
        {articleById.title && (
          <section>
            <h3>{articleById.title}</h3>
            <p>
              by:{" "}
              <Link to={`/users/${articleById.created_by.username}`}>
                {articleById.created_by.username}
              </Link>
            </p>
            {articleById.body}
            <p>Votes: {articleById.votes}</p>
            <p>Comments: {articleById.comments}</p>
          </section>
        )}
      </article>
    );
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    this.fetchArticlesById(articleId).then(article => {
      this.setState({
        articleById: article
      });
    });
  }

  fetchArticlesById = articleId => {
    return axios
      .get(`https://rosies-ncnews.herokuapp.com/api/articles/${articleId}`)
      .then(({ data }) => {
        return data.article;
      });
  };
}

export default SingleArticle;
