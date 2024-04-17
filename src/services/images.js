import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.baseUrl}/api/images`;

const getImages = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export default { getImages };
