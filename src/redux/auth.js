import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  // Sign In Actions
  signIn: ['email', 'password'],
  signOut: [],
  signInSuccess: ['token'],
  requestAuthFailed: ['signInError'],
  clearResult: [],
  getMe: ['token', 'directCall']
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  fetchAuth: false,
  token: null,
  signInError: null,
};

/* ------------- Reducers ------------- */
const request = () => ({ ...defaultState, fetchAuth: true });
const signInFailure = (state, { signInError }) => ({
  ...state,
  fetchAuth: false,
  signInError,
});

const signInSuccess = (state, { token }) => ({
  ...state,
  fetchAuth: false,
  token,
  signInError: null,
});

const signOut = () => ({ ...defaultState });

const clearResult = () => ({ ...defaultState });

/* ------------- Hookup Reducers To Types ------------- */
export const authReducer = createReducer(defaultState, {
  [Types.SIGN_IN]: request,
  [Types.SIGN_OUT]: signOut,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.REQUEST_AUTH_FAILED]: signInFailure,
  [Types.CLEAR_RESULT]: clearResult,
  [Types.GET_ME]: request
});
