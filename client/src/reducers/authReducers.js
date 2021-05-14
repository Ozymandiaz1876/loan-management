import {
  SET_CURRENT_USER,
  USER_LOADING,
  USER_LOAD_DATA,
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  loandata: {},
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOAD_DATA:
      return {
        ...state,
        loandata: action.payload,
      };
    default:
      return state;
  }
}
