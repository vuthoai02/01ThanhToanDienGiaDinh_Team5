import { INIT_STATE } from "../../constant";
import {
  getUser,
  getType,
  createUser,
  getUserById,
  logout,
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
      return state;
    case getType(getUserById.getUserByIdSuccess):
      return action.payload;
    case getType(logout):
      return null;
    default:
      return state;
  }
}
