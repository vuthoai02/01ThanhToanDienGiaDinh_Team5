import { takeLatest } from "redux-saga/effects";
import * as userActions from "../actions/userActions";
import * as adminActions from "../actions/adminActions";
import {
  fetchUserByIdSaga,
  fetchUserSaga,
  createUserSaga,
  updateCusCode,
  fetchBillsSaga,
  fetchCustomerSaga,
  showBillSaga,
  changePasswordSaga,
  paySaga
} from "./users.js";
import {
  createCustomerSaga,
  searchCustomerSaga,
  fetchCustomersSaga,
  deleteCustomerSaga,
  getAllUsersSaga,
  getUserSaga,
  changeAuthSaga,
  deleteUserSaga,
  createBillSaga,
  getBillsSaga,
  deleteBillSaga,
  getBillsByCodeSaga,
  updateCustomerSaga,
  updateBillSaga
} from "./admin.js";
function* mySaga() {
  /*============USER==================*/
  yield takeLatest(
    userActions.getUserById.getUserByIdRequest,
    fetchUserByIdSaga
  );
  yield takeLatest(userActions.getUser.getUserRequest, fetchUserSaga);
  yield takeLatest(userActions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(
    userActions.updateCusCode.updateCusCodeRequest,
    updateCusCode
  );
  yield takeLatest(userActions.getBills.getBillsURequest, fetchBillsSaga);
  yield takeLatest(userActions.fetchCustomer.fetchCustomerRequest, fetchCustomerSaga);
  yield takeLatest(userActions.showBill.showBillRequest, showBillSaga);
  yield takeLatest(userActions.changePassword.changePasswordRequest, changePasswordSaga);
  yield takeLatest(userActions.pay.payRequest,paySaga);
  /*=============ADMIN===============*/
  yield takeLatest(
    adminActions.createCustomer.createCustomerRequest,
    createCustomerSaga
  );
  yield takeLatest(
    adminActions.getCustomer.getCustomerRequest,
    fetchCustomersSaga
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
  yield takeLatest(adminActions.getBillsByCode.getBillsByCodeRequest, getBillsByCodeSaga);
  yield takeLatest(adminActions.updateCustomer.updateCustomerRequest, updateCustomerSaga);
  yield takeLatest(adminActions.updateBill.updateBillRequest, updateBillSaga);
}

export default mySaga;
