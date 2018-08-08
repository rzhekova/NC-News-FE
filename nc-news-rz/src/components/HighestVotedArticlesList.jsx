import React from "react";
import HighestVotedArticleItem from "./HighestVotedArticleItem";

const HighestVotedArticlesList = ({ articles }) => {
  return (
    <div>
      <ul>
        {articles.map(article => {
          return (
            article.votes > 10 && (
              <HighestVotedArticleItem
                key={article.id}
                article={article.article}
              />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default HighestVotedArticlesList;
