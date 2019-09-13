import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from './sagas';
import AuthActions, { authReducer as auth } from './auth';
import UserActions, { userReducer as user } from './user';
import StatementActions, { statementReducer as statement } from './statement';
import BoardActions, { boardReducer as board } from './board';
import RoutineActions, { routineReducer as routine } from './routine';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    auth,
    user,
    statement,
    board,
    routine
  });
  return configureStore(rootReducer, rootSaga);
};

export {
  AuthActions,
  UserActions,
  StatementActions,
  BoardActions,
  RoutineActions
};
