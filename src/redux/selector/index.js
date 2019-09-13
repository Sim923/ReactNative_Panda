import { createSelector } from 'reselect';

const auth$ = state => state.auth;
export const authSelector = createSelector(auth$, auth => ({
  auth,
}));

const user$ = state => state.user;
export const userSelector = createSelector(user$, user => ({
  user,
}));

const statement$ = state => state.statement;
export const statementSelector = createSelector(statement$, statement => ({
  statement,
}));

const board$ = state => state.board;
export const boardSelector = createSelector(board$, board => ({
  board
}));

const routine$ = state => state.routine;
export const routineSelector = createSelector(routine$, routine => ({
  routine
}));
