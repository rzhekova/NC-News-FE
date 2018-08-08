import React from "react";
import List from "./List";

const MostPopularArticlesList = ({ articles, func }) => {
  return <List list={articles} func={func} />;
};

export default MostPopularArticlesList;
