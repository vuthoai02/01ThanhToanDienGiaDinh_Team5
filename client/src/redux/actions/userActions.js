import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getUserById = createActions({
  getUserByIdRequest: (payload) => payload,
  getUserByIdSuccess: (payload) => payload,
  getUserByIdFailure: (err) => err,
});

export const getUser = createActions({
  getUserRequest: (payload) => payload,
  getUserSuccess: (payload) => payload,
  getUserFailure: (err) => err,
});

export const createUser = createActions({
  createUserRequest: (payload) => payload,
  createUserSuccess: (payload) => payload,
  createUserFailure: (err) => err,
});


export const updateCusCode = createActions({
  updateCusCodeRequest: (payload) => payload,
  updateCusCodeSuccess: (payload) => payload,
  updateCusCodeFailure: (err) => err
});

export const getBills = createActions({
  getBillsRequest: payload => payload,
  getBillsSuccess: payload => payload,
  getBillsFailure: err => err
});

export const fetchCustomer = createActions({
  fetchCustomerRequest: payload => payload,
  fetchCustomerSuccess: payload => payload,
  fetchCustomerFailure: err => err
});

export const showBill = createActions({
  showBillRequest: payload => payload,
  showBillSuccess: payload => payload,
  showBillFailure: err => err
})

export const logout = createAction("LOGOUT");