import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getRoutinesForUser: [],
  getRoutinesSuccess: ['allRoutines'],
  getRoutinesFailure: ['fetchRoutineError'],
  clearRoutine: []
});

export const RoutineTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  fetchRoutine: false,
  fetchRoutineError: null,
  allRoutines: []
};

/* ------------- Reducers ------------- */
const request = (state) => ({ ...state, fetchRoutine: true, fetchRoutineError: null });

const clearRoutine = () => ({ ...defaultState });
const getActiveRoutineSuccess = (state, { allRoutines }) => ({
  ...state,
  fetchRoutine: false,
  allRoutines,
  fetchRoutineError: null
});

const getActiveRoutineFailure = (state, { fetchRoutineError }) => ({
  ...state,
  fetchRoutineError,
  fetchRoutine: false,
});

/* ------------- Hookup Reducers To Types ------------- */
export const routineReducer = createReducer(defaultState, {
  [Types.GET_ROUTINES_FOR_USER]: request,
  [Types.GET_ROUTINES_SUCCESS]: getActiveRoutineSuccess,
  [Types.GET_ROUTINES_FAILURE]: getActiveRoutineFailure,
  [Types.CLEAR_ROUTINE]: clearRoutine,
});
