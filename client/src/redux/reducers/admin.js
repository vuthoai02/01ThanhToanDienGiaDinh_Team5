import { INIT_STATE } from "../../constant";
import {
  getType,
  createCustomer,
  getCustomer,
  searchCustomer,
  deleteCustomer,
  getAllUsers,
  getUser,
  changeAuth,
  delelteUser,
  createBill,
  getBills,
  deleteBill
} from "../actions/adminActions";

export default function adminReducers(state = INIT_STATE.admin, action) {
  switch (action.type) {
    case getType(getCustomer.getCustomerRequest):
    case getType(createCustomer.createCustomerRequest):
    case getType(getCustomer.getCustomerFailure):
    case getType(createCustomer.createCustomerFailure):
    case getType(searchCustomer.searchCustomerRequest):
    case getType(searchCustomer.searchCustomerFailure):
    case getType(deleteCustomer.deleteCustomerRequest):
    case getType(deleteCustomer.deleteCustomerFailure):
    case getType(getAllUsers.getAllUsersRequest):
    case getType(getAllUsers.getAllUsersFailure):
    case getType(getUser.getUserRequest):
    case getType(getUser.getUserFailure):
    case getType(changeAuth.changeAuthRequest):
    case getType(changeAuth.changeAuthSuccess):
    case getType(changeAuth.changeAuthFailure):
    case getType(delelteUser.delelteUserRequest):
    case getType(delelteUser.delelteUserFailure):
    case getType(createBill.createBillRequest):
    case getType(createBill.createBillFailure):
    case getType(getBills.getBillsRequest):
    case getType(getBills.getBillsFailure):
    case getType(deleteBill.deleteBillRequest):
    case getType(deleteBill.deleteBillFailure):
      return state;
    case getType(createCustomer.createCustomerSuccess):
      return { ...state, customers: [...state.customers, action.payload] };
    case getType(getCustomer.getCustomerSuccess):
      return { ...state, customers: action.payload };
    case getType(searchCustomer.searchCustomerSuccess):
      console.log("search: ", action?.payload);
      return { ...state, customers: [action.payload] };
    case getType(deleteCustomer.deleteCustomerSuccess):
      return {
        ...state,
        customers: state.customers.filter(
          (elm) => elm.customerCode !== action.payload.customerCode
        ),
      };
    case getType(getAllUsers.getAllUsersSuccess):
      return { ...state, users: action.payload };
    case getType(getUser.getUserSuccess):
      return { ...state, users: [action.payload] };
    case getType(delelteUser.delelteUserSuccess):
      return {
        ...state,
        users: state.users.filter((elm) => elm?.id !== action.payload.id),
      };
    case getType(createBill.createBillSuccess):
      return {...state, bills: [...state.bills, action.payload]};
    case getType(getBills.getBillsSuccess):
      return {...state, bills: action.payload};
    case getType(deleteBill.deleteBillSuccess):
      return {...state, bills: [...state.bills.filter(elm => elm._id !== action.payload._id)]};
    default:
      return state;
  }
}
