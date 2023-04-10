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
  showBill
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
    case getType(getBills.getBillsRequest):
    case getType(getBills.getBillsFailure):
    case getType(fetchCustomer.fetchCustomerRequest):
    case getType(fetchCustomer.fetchCustomerFailure):
    case getType(showBill.showBillRequest):
    case getType(showBill.showBillFailure):
      return state;
    case getType(getUserById.getUserByIdSuccess):
      return {...state, info: action.payload};
    case getType(updateCusCode.updateCusCodeSuccess):
      return {...state, info: {...state.info, customerCode: action.payload}};
    case getType(getBills.getBillsSuccess):
      return {...state, bills: action.payload};
    case getType(fetchCustomer.fetchCustomerSuccess):
      return {...state, infoCus: action.payload};
    case getType(showBill.showBillSuccess):
      return {...state, detail: action.payload};
    case getType(logout):
      return null;
    default:
      return state;
  }
}
