import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../auth';
import { StatementTypes } from '../statement';
import { BoardTypes } from '../board';
import { RoutineTypes } from '../routine';

/* ------------- Sagas ------------- */
import { signIn, signOut, getMe } from './auth';
import {
  getActiveStatement,
  getAllStatements,
  createNewStatement,
  selectStatement,
  deleteStatement
} from './statement';
import { getBoard } from './board';
import { getRoutinesForUser } from './routine';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(AuthTypes.SIGN_IN, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(StatementTypes.GET_ACTIVE_STATEMENT, getActiveStatement),
    takeLatest(BoardTypes.GET_BOARD, getBoard),
    takeLatest(StatementTypes.GET_ALL_STATEMENTS, getAllStatements),
    takeLatest(StatementTypes.CREATE_NEW_STATEMENT, createNewStatement),
    takeLatest(StatementTypes.SELECT_STATEMENT, selectStatement),
    takeLatest(StatementTypes.DELETE_STATEMENT, deleteStatement),
    takeLatest(RoutineTypes.GET_ROUTINES_FOR_USER, getRoutinesForUser),
    takeLatest(AuthTypes.GET_ME, getMe)
  ]);
}
