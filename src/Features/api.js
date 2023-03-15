import axios from 'axios';

const API = axios.create({
  baseURL: 'https://furniture-website-server2.onrender.com/api/v1',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('Profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('Profile')).token
    }`;
  }
  return req;
});
export const signup = (formData) => API.post('/users/signup', formData);
export const signin = (formData) => API.post('/users/signin', formData);
export const payOndelivery = (formData) =>
  API.post('/payments/cashondelivery', formData);
export const mpesaStkPush = (formData) => API.post('/payments/stk', formData);
export const updateUser = ({ id, formData }) =>
  API.patch(`/users/editUser/${id}`, formData);
export const deleteUser = (id) => API.delete(`/users/delete/${id}`);
export const getAllProducts = () =>
  API.get('/products/getallproductsforclients');
export const getSingleProduct = (id) =>
  API.get(`/products/getsingleproduct/${id}`);
export const getOrder = (id) => API.get(`/payments/getorders/${id}`);
/* export const getfilteredproducts = ({}) =>
  API.get(`/products/getsingleproduct/?search=${}&rating=${}&sort=${},${}}`); */
