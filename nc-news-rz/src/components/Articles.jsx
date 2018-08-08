import React from "react";

const Articles = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        return <li key={article._id}>{article.title}</li>;
      })}
    </ul>
  );
};

export default Articles;
