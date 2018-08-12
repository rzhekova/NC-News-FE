import React from "react";
import { Link } from "react-router-dom";
import * as utils from "../utils/utils";
import PT from "prop-types";

const AllArticles = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        return (
          <li className="article" key={article._id}>
            <span className="votes">{article.votes}</span>
            <Link to={`/articles/${article._id}`}>{article.title} </Link>
            <span>
              <Link to={`/topics/${article.belongs_to}`}>
                {article.belongs_to}
              </Link>
            </span>
            <p>
              written by:{" "}
              <Link to={`/users/${article.created_by.username}`}>
                {" "}
                {article.created_by.username}
              </Link>
            </p>
            <p>{utils.formatDate(article.created_at)}</p>
          </li>
        );
      })}
    </ul>
  );
};

AllArticles.propTypes = {
  articles: PT.arrayOf(PT.object).isRequired
};

export default AllArticles;
