import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { URL } from "../config";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  USER_LOAD_DATA,
} from "./types";
// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`/api/users/register`, userData)
    .then((res) => history.push("/login")) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`/api/users/login`, userData)
    .then((res) => {
      console.log(res);
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      //get user loan data
      axios
        .get(`/api/users/myapplication`, {
          headers: { user: decoded.name },
        })
        .then((res) => {
          const { posts } = res.data;
          dispatch(setUserLoanData(posts));
          // Set current user
          dispatch(setCurrentUser(decoded));
        })
        .catch((err) =>
          dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoanData = (data) => {
  return {
    type: USER_LOAD_DATA,
    payload: data,
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const addLoan = (loanData) => (dispatch) => {
  axios.post(`/api/users/addloan`, loanData).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  );
};
