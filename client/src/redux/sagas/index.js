import { takeLatest } from "redux-saga/effects";
import * as userActions from "../actions/userActions";
import * as adminActions from "../actions/adminActions";
import { fetchUserByIdSaga, fetchUserSaga, createUserSaga } from "./users.js";
import {
  createCustomerSaga,
  fetchCustomerSaga,
  searchCustomerSaga,
  deleteCustomerSaga,
  getAllUsersSaga,
  getUserSaga,
  changeAuthSaga,
  deleteUserSaga,
  createBillSaga,
  getBillsSaga,
  deleteBillSaga
} from "./admin.js";
function* mySaga() {
  yield takeLatest(
    userActions.getUserById.getUserByIdRequest,
    fetchUserByIdSaga
  );
  yield takeLatest(userActions.getUser.getUserRequest, fetchUserSaga);
  yield takeLatest(userActions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(
    adminActions.createCustomer.createCustomerRequest,
    createCustomerSaga
  );
  yield takeLatest(
    adminActions.getCustomer.getCustomerRequest,
    fetchCustomerSaga
  );
  yield takeLatest(
    adminActions.searchCustomer.searchCustomerRequest,
    searchCustomerSaga
  );
  yield takeLatest(
    adminActions.deleteCustomer.deleteCustomerRequest,
    deleteCustomerSaga
  );
  yield takeLatest(
    adminActions.getAllUsers.getAllUsersRequest,
    getAllUsersSaga
  );
  yield takeLatest(adminActions.getUser.getUserRequest, getUserSaga);
  yield takeLatest(adminActions.changeAuth.changeAuthRequest, changeAuthSaga);
  yield takeLatest(adminActions.delelteUser.delelteUserRequest, deleteUserSaga);
  yield takeLatest(adminActions.createBill.createBillRequest, createBillSaga);
  yield takeLatest(adminActions.getBills.getBillsRequest, getBillsSaga);
  yield takeLatest(adminActions.deleteBill.deleteBillRequest, deleteBillSaga);
}

export default mySaga;
