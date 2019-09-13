import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestUserFailed: ['error'],
  setUserInformation: ['userInformation'],
  getUserInformation: [''],
  clearUser: [],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  apiToken: null,
  userInformation: null,
  fetchingUser: false,
};
/* ------------- Reducers ------------- */
const request = state => ({ ...state, fetchingUser: true });
const clear = () => ({ ...defaultState });
const failure = (state, { error }) => ({ ...state, fetchingUser: false, error });
const setUserInformation = (state, { userInformation }) => ({
  ...state, userInformation, fetchingUser: false,
});
/* ------------- Hookup Reducers To Types ------------- */
export const userReducer = createReducer(defaultState, {
  [Types.SET_USER_INFORMATION]: setUserInformation,
  [Types.GET_USER_INFORMATION]: request,
  [Types.REQUEST_USER_FAILED]: failure,
  [Types.CLEAR_USER]: clear,
});
