import axios from 'axios';
const baseUrl = '/api/login';

const loginToDb = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { loginToDb };
