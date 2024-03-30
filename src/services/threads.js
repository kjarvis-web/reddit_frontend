import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/posts';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getThread = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedObj) => {
  const response = await axios.put(`${baseUrl}/${updatedObj.id}`, updatedObj);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config);
  return response.data;
};

const addReply = async (id, reply) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`http://localhost:3000/api/comments/${id}`, reply, config);

  return response.data;
};

const getComments = async () => {
  const request = await axios.get(`http://localhost:3000/api/comments`);
  return request.data;
};

export default { getAll, create, setToken, update, addComment, getComments, getThread, addReply };
