import { call, put } from 'redux-saga/effects';
import { getRoutinesForUser as getRoutinesForUserApi } from '../../service/api';
import { RoutineActions } from '../';

export function* getRoutinesForUser() {
  try {
    const ret = yield call(getRoutinesForUserApi);
    if (ret && ret.length) {
      yield put(RoutineActions.getRoutinesSuccess(ret));
    } else {
      yield put(RoutineActions.getRoutinesFailure(ret));
    }
  } catch (e) {
    yield put(RoutineActions.getRoutinesFailure('Network Connection Lost!'));
  }
}
