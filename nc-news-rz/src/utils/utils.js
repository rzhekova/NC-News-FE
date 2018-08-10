import React from "react";
import { Link } from "react-router-dom";

export const formatDate = date => {
  date = date
    .slice(0, 16)
    .split("T")
    .reverse();
  return (
    date[0] +
    " " +
    date[1]
      .split("-")
      .reverse()
      .join("-")
  );
};

export const formatPopularArticles = articleObject => {
  return (
    articleObject.comments > 10 && (
      <article>
        <div>
          <Link to={`/articles/${articleObject._id}`}>
            {articleObject.title}
          </Link>
        </div>
      </article>
    )
  );
};
