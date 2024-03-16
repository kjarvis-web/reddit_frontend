import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/posts';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

export default { getAll, create };
