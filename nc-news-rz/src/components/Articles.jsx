import React from "react";
import List from "./List";

const Articles = ({ articles }) => {
  return (
    <div>
      <header>
        <h2>Articles</h2>
      </header>
      <List list={articles} property="article" />
    </div>
  );
};

export default Articles;
