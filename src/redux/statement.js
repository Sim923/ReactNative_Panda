import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getActiveStatement: [],
  getActiveStatementSuccess: ['activeStatement'],
  getActiveStatementFailure: ['fetchStatementError'],
  clearStatement: [],
  getAllStatements: ['lang'],
  getAllStatementsSuccess: ['allStatements'],
  getAllStatementsFailure: ['fetchStatementError'],
  createNewStatement: ['title', 'text', 'lang'],
  createNewStatementSuccess: [],
  createNewStatementFailure: ['fetchStatementError'],
  selectStatement: ['statementId', 'lang'],
  selectStatementSuccess: [],
  selectStatementFailure: ['fetchStatementError'],
  deleteStatement: ['statementId' ,'isActive', 'lang'],
  deleteStatementSuccess: [],
  deleteStatementFailure: ['fetchStatementError']
});

export const StatementTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  fetchStatement: false,
  fetchStatementError: null,
  activeStatement: null,
  allStatements: []
};

/* ------------- Reducers ------------- */
const request = (state) => ({ ...state, fetchStatement: true, fetchStatementError: null });

const getActiveStatementSuccess = (state, { activeStatement }) => ({
  ...state,
  activeStatement,
  fetchStatement: false
});

const getActiveStatementFailure = (state, { fetchStatementError }) => ({
  ...state,
  fetchStatementError,
  fetchStatement: false
});

const getAllStatementsSuccess = (state, { allStatements }) => ({
  ...state,
  allStatements,
  fetchStatement: false
});

const getAllStatementsFailure = (state, { fetchStatementError }) => ({
  ...state,
  fetchStatementError,
  fetchStatement: false
});

const clearStatement = () => ({ ...defaultState });

const createNewStatementSuccess = (state) => ({
  ...state,
  fetchStatement: false
});

const createNewStatementFailure =  (state, { fetchStatementError }) => ({
  ...state,
  fetchStatementError,
  fetchStatement: false
});

const selectStatementSuccess = (state) => ({
  ...state,
  fetchStatement: false
});

const selectStatementFailure = (state, { fetchStatementError }) => ({
  ...state,
  fetchStatementError,
  fetchStatement: false
});

const deleteStatementSuccess = (state) => ({
  ...state,
  fetchStatement: false
});

const deleteStatementFailure = (state, { fetchStatementError }) => ({
  ...state,
  fetchStatementError,
  fetchStatement: false
});

/* ------------- Hookup Reducers To Types ------------- */
export const statementReducer = createReducer(defaultState, {
  [Types.GET_ACTIVE_STATEMENT]: request,
  [Types.GET_ACTIVE_STATEMENT_SUCCESS]: getActiveStatementSuccess,
  [Types.GET_ACTIVE_STATEMENT_FAILURE]: getActiveStatementFailure,
  [Types.CLEAR_STATEMENT]: clearStatement,
  [Types.GET_ALL_STATEMENTS]: request,
  [Types.GET_ALL_STATEMENTS_SUCCESS]: getAllStatementsSuccess,
  [Types.GET_ALL_STATEMENTS_FAILURE]: getAllStatementsFailure,
  [Types.CREATE_NEW_STATEMENT]: request,
  [Types.CREATE_NEW_STATEMENT_SUCCESS]: createNewStatementSuccess,
  [Types.CREATE_NEW_STATEMENT_FAILURE]: createNewStatementFailure,
  [Types.SELECT_STATEMENT]: request,
  [Types.SELECT_STATEMENT_SUCCESS]: selectStatementSuccess,
  [Types.SELECT_STATEMENT_FAILURE]: selectStatementFailure,
  [Types.DELETE_STATEMENT]: request,
  [Types.DELETE_STATEMENT_SUCCESS]: deleteStatementSuccess,
  [Types.DELETE_STATEMENT_FAILURE]: deleteStatementFailure
});
