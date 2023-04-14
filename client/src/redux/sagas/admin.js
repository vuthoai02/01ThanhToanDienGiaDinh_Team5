import { NotificationManager } from "react-notifications";
import { call, put } from "redux-saga/effects";
import * as adminActions from "../actions/adminActions";
import * as api from "../../api";

/*===========CUSTOMER=============*/

export function* createCustomerSaga(action){
    try{
        const customer = yield call(api.createCustomer, action.payload);
        yield put(adminActions.createCustomer.createCustomerSuccess(action.payload));
        NotificationManager.success("", customer.data.message, 3000);
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.createCustomer.createCustomerFailure(error));
    }
}

export function* fetchCustomersSaga(action){
    try {
        const customerList = yield call(api.fetchCustomerList, action.payload);
        yield put(adminActions.getCustomer.getCustomerSuccess(customerList.data.data));
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.getCustomer.getCustomerFailure(error));
    }
}

export function* searchCustomerSaga(action){
    try {
        const customer = yield call(api.getCustomer, action.payload);
        yield put(adminActions.searchCustomer.searchCustomerSuccess(customer.data.data));
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.searchCustomer.searchCustomerFailure(error));
    }
}

export function* deleteCustomerSaga(action){
    try {
        const deleteCus = yield call(api.deleteCustomer, action.payload);
        yield put(adminActions.deleteCustomer.deleteCustomerSuccess(action.payload));
        NotificationManager.success("", deleteCus.data.message, 3000);
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.deleteCustomer.deleteCustomerFailure(error));
    }
}

export function* updateCustomerSaga(action){
    try {
        const customer = yield call(api.updateCustomer,action.payload);
        yield put(adminActions.updateCustomer.updateCustomerSuccess(customer.data.data));
        NotificationManager.success("", customer.data.message, 3000);
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.updateCustomer.updateCustomerFailure(error));
    }
}

/*===============HANDLE USERS=================*/
export function* getAllUsersSaga(action){
    try {
        const users = yield call(api.getAllUsers);
        yield put(adminActions.getAllUsers.getAllUsersSuccess(users.data.data));
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.getAllUsers.getAllUsersFailure(error));
    }
}

export function* getUserSaga(action){
    try {
        const user = yield call(api.getUser, action.payload);
        yield put(adminActions.getUser.getUserSuccess(user.data.data));
    } catch (error){
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.getUser.getUserFailure(error));
    }
}

export function* changeAuthSaga(action){
    try {
        yield call(api.chageAuth, action.payload);
        yield put(adminActions.changeAuth.changeAuthSuccess());
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.changeAuth.changeAuthFailure(error));
    }
}

export function* deleteUserSaga(action){
    try {
        const user = yield call(api.deleteUser,action.payload);
        yield put(adminActions.delelteUser.delelteUserSuccess(action.payload));
        NotificationManager.success("",user.data.message, 3000);
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.delelteUser.delelteUserFailure(error));
    }
}

/*=================HANDLE BILLS=============*/

export function* createBillSaga(action){
    try {
        const bill = yield call(api.createBill,action.payload);
        yield put(adminActions.createBill.createBillSuccess(action.payload));
        NotificationManager.success("",bill.data.message, 3000);
    } catch (error){
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.createBill.createBillFailure(error));
    }
}

export function* getBillsSaga(){
    try {
        const bills = yield call(api.getBills);
        yield put(adminActions.getBills.getBillsSuccess(bills.data.data));
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.getBills.getBillsFailure(error));
    }
}

export function* deleteBillSaga(action){
    try {
        const bill = yield call(api.deleteBill,action.payload);
        yield put(adminActions.deleteBill.deleteBillSuccess(action.payload));
        NotificationManager.success("",bill.data.message, 3000);
    } catch (error) {
        NotificationManager.error("", error.response.data.message,3000);
        yield put(adminActions.deleteBill.deleteBillFailure(error));
    }
}

export function* getBillsByCodeSaga(action){
    try {
        const bills = yield call(api.getBillsByCode, action.payload);
        yield put(adminActions.getBillsByCode.getBillsByCodeSuccess(bills.data?.data))
    } catch (error) {
        console.log(error);
        NotificationManager.error("", error.response.data?.message,3000);
        yield put(adminActions.getBillsByCode.getBillsByCodeFailure(error));
    }
}

export function* updateBillSaga(action){
    try {
        const bill = yield call(api.updateBill, action.payload);
        yield put(adminActions.updateBill.updateBillSuccess(bill.data.data));
        NotificationManager.success("",bill.data.message,3000);
    } catch (error) {
        NotificationManager.error("", error.response.data?.message,3000);
        yield put(adminActions.updateBill.updateBillFailure(error));
    }
}