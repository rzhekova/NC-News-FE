import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PT from "prop-types";

const SingleComment = ({
  commentObject,
  handleVote,
  handleDelete,
  commentIds
}) => {
  return (
    <main>
      <p>
        "<i>{commentObject.body}</i>"
      </p>
      <p>
        {commentObject.created_at &&
          moment(commentObject.created_at.slice(0, 10), "YYYY-MM-DD").fromNow()}
      </p>
      <span>
        <p>
          posted by:{" "}
          <Link to={`/users/${commentObject.created_by.username}`}>
            {commentObject.created_by.username}
          </Link>
        </p>
        <p>
          <button
            disabled={commentIds.includes(commentObject._id) ? true : false}
            className="vote-up"
            onClick={() => handleVote("up", commentObject._id)}
          >
            <i
              className="fas fa-arrow-up"
              style={
                commentIds.includes(commentObject._id)
                  ? { color: "grey" }
                  : { color: "darkgreen" }
              }
            />
          </button>
          {commentObject.votes}
          <button
            disabled={commentIds.includes(commentObject._id) ? true : false}
            onClick={() => handleVote("down", commentObject._id)}
          >
            <i
              className="fas fa-arrow-down"
              style={
                commentIds.includes(commentObject._id)
                  ? { color: "grey" }
                  : { color: "darkred" }
              }
            />
          </button>
        </p>
      </span>
      <button
        style={{ border: "1px solid rgb(167, 167, 167)", marginLeft: "0" }}
        onClick={() => handleDelete(commentObject._id)}
      >
        Delete
      </button>
      <hr />
    </main>
  );
};

SingleComment.propTypes = {
  commentObject: PT.object.isRequired,
  handleVote: PT.func.isRequired,
  handleDelete: PT.func.isRequired
};

export default SingleComment;
