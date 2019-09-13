import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { getBoard as getBoardApi } from '../../service/api';
import { BoardActions } from '../';

export function* getBoard() {
  try {
    const ret = yield call(getBoardApi);
    if (ret && ret.id) {
      yield put(BoardActions.getBoardSuccess(get(ret, 'images', []), ret.id));
    } else {
      yield put(BoardActions.getBoardFailure(ret));
    }
  } catch (e) {
    yield put(BoardActions.getBoardFailure('Network Connection Lost!'));
  }
}
