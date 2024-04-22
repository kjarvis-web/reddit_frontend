import axios from 'axios';
import config from '../utils/config';
const postUrl = `${config.baseUrl}/api/posts`;
const commentUrl = `${config.baseUrl}/api/comments`;

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (page) => {
  const request = await axios.get(`${postUrl}?page=${page}`);
  return request.data.posts;
};

const getTotalPages = async () => {
  const request = await axios.get(`${postUrl}/total`);
  console.log('getTotal', request.data);
  return request.data;
};

const getThread = async (id) => {
  const request = await axios.get(`${postUrl}/${id}`);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(postUrl, newObject, config);
  return response.data;
};

const update = async (updatedObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${postUrl}/${updatedObj.id}`, updatedObj, config);
  return response.data;
};

// upvote post
const upVote = async (updatedObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${postUrl}/${updatedObj.id}/upvote`, updatedObj, config);
  return response.data;
};

// downvote post
const downVote = async (updatedObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${postUrl}/${updatedObj.id}/downvote`, updatedObj, config);
  return response.data;
};

// upvote comment
const upVoteComment = async (updatedObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${commentUrl}/${updatedObj.id}/upvote`, updatedObj, config);
  return response.data;
};

// downvote comment
const downVoteComment = async (updatedObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${commentUrl}/${updatedObj.id}/downvote`, updatedObj, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${postUrl}/${id}/comments`, comment, config);
  return response.data;
};

const addReply = async (id, reply) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${commentUrl}/${id}`, reply, config);

  return response.data;
};

const getComments = async () => {
  const request = await axios.get(`${commentUrl}`);
  return request.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${postUrl}/${id}`, config);
  return response.data;
};

const removeComment = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${commentUrl}/${id}`, config);
  return response.data;
};

const updateComment = async (updatedComment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${commentUrl}/${updatedComment.id}`, updatedComment, config);
  return response.data;
};

export default {
  getAll,
  getTotalPages,
  create,
  setToken,
  update,
  addComment,
  getComments,
  getThread,
  addReply,
  upVote,
  downVote,
  upVoteComment,
  downVoteComment,
  remove,
  removeComment,
  updateComment,
};
