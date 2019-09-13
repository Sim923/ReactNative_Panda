import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getBoard: [],
  getBoardSuccess: ['boardImages', 'boardId'],
  getBoardFailure: ['fetchBoardError'],
  clearBoard: [],
});

export const BoardTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  fetchBoard: false,
  fetchBoardError: null,
  boardImages: [],
  boardId: 0
};

/* ------------- Reducers ------------- */
const request = () => ({ ...defaultState, fetchBoard: true });

const clearBoards = () => ({ ...defaultState });

const getBoardSuccess = (state, { boardImages, boardId }) =>
  ({ ...state, boardImages, boardId, fetchBoard: false, fetchBoardError: null });
const getBoardFailure = (state, { fetchBoardError }) => ({
  ...state, fetchBoardError, fetchBoard: false
});

/* ------------- Hookup Reducers To Types ------------- */
export const boardReducer = createReducer(defaultState, {
  [Types.GET_BOARD]: request,
  [Types.GET_BOARD_SUCCESS]: getBoardSuccess,
  [Types.CLEAR_BOARD]: clearBoards,
  [Types.GET_BOARD_FAILURE]: getBoardFailure
});
