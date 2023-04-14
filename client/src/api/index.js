import axios from "axios";

const URL = "http://localhost:5000";

/*=================User===========================*/
export const fetchUser = (payload) => axios.post(`${URL}/users/login`, payload);
export const fetchUserById = (payload) =>
  axios.get(`${URL}/users`, {
    headers: { Authorization: `Bearer ${payload}` },
  });
export const createUser = (payload) =>
  axios.post(`${URL}/users/register`, payload);
export const fetchCustomer = (payload) => axios.get(`${URL}/customer`, {params: {customerCode: payload}});
export const changePassword = (payload) => axios.put(`${URL}/users/change-password`, payload);
export const payment = (payload) => axios.put(`${URL}/customer/payment`, payload);

/*==================ADMIN========================*/
export const createCustomer = (payload) =>
  axios.post(`${URL}/admin/create-customer`, payload);
export const fetchCustomerList = () => axios.get(`${URL}/admin`);
export const getCustomer = (payload) =>
  axios.get(`${URL}/admin/get-customer`, { params: payload });
export const deleteCustomer = (payload) =>
  axios.post(`${URL}/admin/delete-customer`, { params: { id: payload?._id } });
export const getAllUsers = () => axios.get(`${URL}/admin/get-all-users`);
export const getUser = (payload) => axios.get(`${URL}/admin/get-user`,{params: payload});
export const chageAuth = (payload) => axios.put(`${URL}/admin/change-auth`,payload);
export const deleteUser = (payload) => axios.post(`${URL}/admin/delete-user`, { params: { id: payload?._id } })
export const createBill = (payload) => axios.post(`${URL}/admin/create-bill`, payload);
export const getBills = () => axios.get(`${URL}/admin/get-bills`);
export const deleteBill = (payload) => axios.post(`${URL}/admin/delete-bill`, payload);
export const updateCustomerCode = (payload) => axios.put(`${URL}/users/update-customer-code`,payload);
export const getBillsByCode = (payload) => axios.get(`${URL}/customer/get-bills`, {params: payload});
export const updateCustomer = (payload) => axios.put(`${URL}/admin/update-customer`,payload);
export const updateBill = (payload) => axios.put(`${URL}/admin/update-bill`,payload);
