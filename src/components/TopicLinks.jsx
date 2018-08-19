import React from "react";

const TopicLinks = ({ topics, createTopicsLinks }) => {
  return <span>{topics.map(topic => createTopicsLinks(topic))}</span>;
};

export default TopicLinks;
