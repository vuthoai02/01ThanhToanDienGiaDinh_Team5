import { createActions } from "redux-actions";
export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const createCustomer = createActions({
  createCustomerRequest: (payload) => payload,
  createCustomerSuccess: (payload) => payload,
  createCustomerFailure: (err) => err,
});

export const getCustomer = createActions({
  getCustomerRequest: (payload) => payload,
  getCustomerSuccess: (payload) =>  payload,
  getCustomerFailure: (err) => err,
});

export const searchCustomer = createActions({
  searchCustomerRequest: undefined,
  searchCustomerSuccess: (payload) => payload,
  searchCustomerFailure: (err) => err,
});

export const deleteCustomer= createActions({
  deleteCustomerRequest: undefined,
  deleteCustomerSuccess: (payload) => payload,
  deleteCustomerFailure: (err) => err
});

export const getAllUsers = createActions({
  getAllUsersRequest: undefined,
  getAllUsersSuccess: (payload) => payload,
  getAllUsersFailure: (err) => err
});

export const getUser = createActions({
  getUserRequest: undefined,
  getUserSuccess: (payload) => payload,
  getUserFailure: (err) => err,
});

export const changeAuth = createActions({
  changeAuthRequest: payload => payload,
  changeAuthSuccess: undefined,
  changeAuthFailure: err => err
});

export const delelteUser = createActions({
  delelteUserRequest: payload => payload,
  delelteUserSuccess: payload => payload,
  delelteUserFailure: err => err
});

export const createBill = createActions({
  createBillRequest: payload => payload,
  createBillSuccess: payload => payload,
  createBillFailure: err => err
});

export const getBills = createActions({
  getBillsRequest: undefined,
  getBillsSuccess: (payload) => payload,
  getBillsFailure: (err) => err,
});

export const deleteBill = createActions({
  deleteBillRequest: payload => payload,
  deleteBillSuccess: undefined,
  deleteBillFailure: (err) => err,
});
