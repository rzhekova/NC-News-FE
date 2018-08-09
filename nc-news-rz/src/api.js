import axios from "axios";
const URL = "https://rosies-ncnews.herokuapp.com/api/";

export const fetchAllArticles = () => {
  return axios.get(`${URL}/articles`).then(({ data }) => {
    return data.articles;
  });
};

export const fetchArticlesById = articleId => {
  return axios.get(`${URL}/articles/${articleId}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchAllTopics = () => {
  return axios.get(`${URL}topics`).then(({ data }) => {
    return data.topics;
  });
};

export const fetchArticlesByTopic = topic => {
  return axios
    .get(`https://rosies-ncnews.herokuapp.com/api/topics/${topic}/articles`)
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchCommentsByArticleId = articleId => {
  return axios.get(`${URL}articles/${articleId}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const fetchUser = username => {
  return axios.get(`${URL}users/${username}`).then(({ data }) => {
    return data;
  });
};

export const updateVoteCount = (query, id, endpoint) => {
  if (query === "up" || query === "down") {
    return axios
      .put(`${URL}${endpoint}/${id}?vote=${query}`)
      .then(({ data }) => {
        return data;
      });
  }
};

export const addComment = (articleId, commentObject) => {
  return axios
    .post(`${URL}articles/${articleId}/comments`, commentObject)
    .then(({ data }) => {
      return data;
    });
};

export const addArticle = (topicId, articleObject) => {
  return axios
    .post(`${URL}topics/${topicId}/articles`, articleObject)
    .then(({ data }) => {
      return data;
    });
};
