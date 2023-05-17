import { INIT_STATE } from "../../constant";
import {
  getUser,
  getType,
  createUser,
  getUserById,
  logout,
  updateCusCode,
  getBills,
  fetchCustomer,
  showBill,
  changePassword,
  paid,
  payment,
  pay,
} from "../actions/userActions";

export default function userReducers(state = INIT_STATE.user, action) {
  switch (action.type) {
    case getType(getUser.getUserRequest):
    case getType(getUser.getUserFailure):
    case getType(getUser.getUserSuccess):
    case getType(createUser.createUserSuccess):
    case getType(createUser.createUserRequest):
    case getType(createUser.createUserFailure):
    case getType(getUserById.getUserByIdRequest):
    case getType(getUserById.getUserByIdFailure):
    case getType(updateCusCode.updateCusCodeRequest):
    case getType(updateCusCode.updateCusCodeFailure):
    case getType(getBills.getBillsURequest):
    case getType(getBills.getBillsUFailure):
    case getType(fetchCustomer.fetchCustomerRequest):
    case getType(fetchCustomer.fetchCustomerFailure):
    case getType(showBill.showBillRequest):
    case getType(showBill.showBillFailure):
    case getType(changePassword.changePasswordRequest):
    case getType(changePassword.changePasswordFailure):
    case getType(changePassword.changePasswordSuccess):
    case getType(pay.payRequest):
    case getType(pay.payFailure):
      return state;
    case getType(getUserById.getUserByIdSuccess):
      return { ...state, info: action.payload };
    case getType(updateCusCode.updateCusCodeSuccess):
      return {
        ...state,
        info: { ...state.info, customerCode: action.payload },
      };
    case getType(getBills.getBillsUSuccess):
      return { ...state, bills: action.payload };
    case getType(fetchCustomer.fetchCustomerSuccess):
      return { ...state, infoCus: action.payload };
    case getType(showBill.showBillSuccess):
      return { ...state, detail: action.payload };
    case getType(paid):
      return {
        ...state,
        bills: state.bills.filter((elm) => elm.isPayment === true),
      };
    case getType(payment):
      return {
        ...state,
        bills: state.bills.filter((elm) => elm.isPayment === false),
      };
    case getType(logout):
      return null;
    case getType(pay.paySuccess):
      return {
        ...state,
        bills: [
          ...state.bills.filter((elm) => elm._id !== action.payload._id),
          action.payload,
        ],
      };
    default:
      return state;
  }
}
