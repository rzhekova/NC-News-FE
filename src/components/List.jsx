import React from "react";
import PT from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import Loading from "./Loading";
import FilterButtons from "./FilterButtons";

const List = ({ list, func, handleClick, isLoading }) => {
  if (func) {
    // this is for the topics component
    return (
      <ul className="articles-by-topic">
        {list.map(listItem => {
          return (
            <div key={listItem._id}>
              <li>
                {func(listItem)}
                <p
                  style={{
                    paddingBottom: "3%",
                    marginTop: 0
                  }}
                >
                  <br />
                  written by:{" "}
                  <Link to={`/users/${listItem.created_by.username}`}>
                    {" "}
                    {listItem.created_by.username}
                  </Link>
                </p>
              </li>
            </div>
          );
        })}
      </ul>
    );
  } else {
    // this is for the articles component
    return (
      <div className="white-background">
        <h3>Welcome to Northcoders News</h3>
        <p className="homepage-paragraph">
          Please use the filter below to see our entire content, our most
          popular articles or just the most recent ones. Alternatively, follow
          the topic links above to see only the articles for a certain topic
        </p>
        <FilterButtons handleClick={handleClick} />
        {isLoading ? (
          <Loading content="articles" />
        ) : (
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
                    {article.created_at && moment(article.created_at).from()}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
};

List.propTypes = {
  title: PT.string,
  list: PT.arrayOf(PT.object).isRequired,
  func: PT.func,
  handleClick: PT.func
};

export default List;
