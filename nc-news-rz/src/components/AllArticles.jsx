import React from "react";
import { Link } from "react-router-dom";

const AllArticles = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        return (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>{article.title} </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AllArticles;
