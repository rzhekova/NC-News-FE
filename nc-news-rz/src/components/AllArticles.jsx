import React from "react";
import { Link } from "react-router-dom";
import * as utils from "../utils/utils";

const AllArticles = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        return (
          <li key={article._id}>
            <span>{article.votes} </span>
            <Link to={`/articles/${article._id}`}>{article.title} </Link>{" "}
            <p>{utils.formatDate(article.created_at)}</p>
            <p>
              written by:{" "}
              <Link to={`/users/${article.created_by.username}`}>
                {" "}
                {article.created_by.username}
              </Link>
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default AllArticles;
