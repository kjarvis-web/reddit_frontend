import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/images';

const getImages = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getImages };
