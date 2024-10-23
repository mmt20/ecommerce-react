import axios from 'axios';

const baseURL = axios.create({ baseURL: 'http://127.0.0.1:8000' });
// const baseURL = axios.create({
//   baseURL: 'https://depi-ecommerce-api-v1-production.up.railway.app',
// });

export default baseURL;
