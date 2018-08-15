import React from "react";
import PT from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

const List = ({ title, list, func }) => {
  if (func) {
    return (
      <ul>
        {list.map(listItem => {
          return <li key={listItem._id}>{func(listItem)}</li>;
        })}
      </ul>
    );
  } else {
    return (
      <div className="white-background">
        {title ? <h2>{title}</h2> : <h2>ALL</h2>}
        <ul>
          {list.map(article => {
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
                <p>
                  {article.created_at &&
                    moment(
                      article.created_at.slice(0, 10),
                      "YYYY-MM-DD"
                    ).fromNow()}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

List.propTypes = {
  title: PT.string,
  list: PT.arrayOf(PT.object).isRequired,
  func: PT.func
};

export default List;
