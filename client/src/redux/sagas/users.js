import { NotificationManager } from "react-notifications";
import { call, put } from "redux-saga/effects";
import * as userActions from "../actions/userActions";
import * as api from "../../api";
export function* fetchUserByIdSaga(action) {
  try {
    const user = yield call(api.fetchUserById, action.payload);
    yield put(userActions.getUserById.getUserByIdSuccess(user.data.data));
  } catch (error) {
    yield put(userActions.getUserById.getUserByIdFailure(error));
    console.log(error);
    NotificationManager.error("", "Đăng nhập không thành công!", 3000);
  }
}

export function* fetchUserSaga(action) {
  try {
    const user = yield call(api.fetchUser, action.payload);
    yield put(userActions.getUser.getUserSuccess(user.data.data));
    NotificationManager.success("", user.data.message, 3000);
    localStorage.setItem(
      "user",
      JSON.stringify({
        accessToken: user.data?.accessToken,
        role: user.data?.data.role,
        userId: user.data?.data._id,
      })
    );
    window.location.href = "/";
  } catch (error) {
    yield put(userActions.getUser.getUserFailure(error));
    NotificationManager.error("", "Đăng nhập không thành công!", 3000);
  }
}

export function* createUserSaga(action) {
  try {
    const user = yield call(api.createUser, action.payload);
    yield put(userActions.createUser.createUserSuccess(user.data));
    NotificationManager.success("", user.data.message, 3000);
    window.location.href= "/login";
  } catch (error) {
    NotificationManager.error("", error.response.data.message, 3000);
    yield put(userActions.createUser.createUserFailure(error));
  }
}

export function* updateCusCode(action){
  try {
    const cusCode = yield call(api.updateCustomerCode, action.payload);
    yield put(userActions.updateCusCode.updateCusCodeSuccess(action.payload?.customerCode));
    NotificationManager.success("", cusCode.data.message, 3000);
  } catch (error) {
    NotificationManager.error("", error.response.data.message, 3000);
    yield put(userActions.updateCusCode.updateCusCodeFailure(error));
  }
}

export function* fetchBillsSaga(action){
  try {
    const bills = yield call(api.getBills, action.payload);
    yield put(userActions.getBills.getBillsSuccess(bills.data.data));
  } catch (error) {
    NotificationManager.error("", error.response.data.message, 3000);
    yield put(userActions.getBills.getBillsFailure(error));
  }
}

export function* fetchCustomerSaga(action){
  try {
    const customer = yield call(api.fetchCustomer, action.payload);
    yield put(userActions.fetchCustomer.fetchCustomerSuccess(customer.data.data));
  } catch (error) {
    NotificationManager.error("", error.response.data.message, 3000);
    yield put(userActions.fetchCustomer.fetchCustomerFailure(error));
  }
}

export function* showBillSaga(action){
  try {
    yield put(userActions.showBill.showBillSuccess(action.payload));
  } catch (error) {
    yield put(userActions.showBill.showBillFailure(error));
  }
}