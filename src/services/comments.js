import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/comments';

let token = null;

const addReply = async (id, reply) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${id}`, reply, config);

  return response.data;
};

const getComments = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { addReply, getComments };
