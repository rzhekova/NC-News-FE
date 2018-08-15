import React from "react";
import { Link } from "react-router-dom";

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

export const formatArticleByTopic = articleOject => {
  return <Link to={`/articles/${articleOject._id}`}>{articleOject.title}</Link>;
};
