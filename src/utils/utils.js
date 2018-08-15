import React from "react";
import { Link } from "react-router-dom";

export const formatPopularArticles = articleObject => {
  return articleObject.votes > 10;
};

export const formatArticleByTopic = articleOject => {
  return <Link to={`/articles/${articleOject._id}`}>{articleOject.title}</Link>;
};
