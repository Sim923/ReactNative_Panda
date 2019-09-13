import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import {
  getActiveStatement as getActiveStatementApi,
  getAllStatements as getAllStatementsApi,
  createStatement,
  selectStatement as selectStatementApi,
  deleteStatement as deleteStatementApi
} from '../../service/api';
import {
  StatementActions,
} from '../';

export function* getActiveStatement() {
  try {
    const ret = yield call(getActiveStatementApi);
    if (ret && ret.id) {
      yield put(StatementActions.getActiveStatementSuccess(ret));
    } else {
      yield put(StatementActions.getActiveStatementFailure(ret));
    }
  } catch (e) {
    yield put(StatementActions.getActiveStatementFailure('Network Connection Lost!'));
  }
}

export function* getAllStatements({ lang }) {
  try {
    const ret = yield call(getAllStatementsApi, lang);
    if (ret && ret.length) {
      yield put(StatementActions.getAllStatementsSuccess(ret));
    } else {
      yield put(StatementActions.getAllStatementsFailure(ret));
    }
  } catch (e) {
    yield put(StatementActions.getAllStatementsFailure('Network Connection Lost!'));
  }
}

export function* createNewStatement({ title, text, lang }) {
  try {
    const ret = yield call(createStatement, title, text);
    if (ret && ret.success) {
      yield call(getAllStatements, { lang });
    } else {
      yield put(StatementActions.getAllStatementsFailure(ret));
    }
  } catch (e) {
    yield put(StatementActions.getAllStatementsFailure('Network Connection Lost!'));
  }
}

export function* selectStatement({ statementId, lang }) {
  try {
    const ret = yield call(selectStatementApi, statementId);
    if (ret && ret.success) {
      yield call(getAllStatements, { lang });
      yield call(getActiveStatement);
      yield put(StatementActions.selectStatementSuccess());
    } else {
      yield put(StatementActions.getAllStatementsFailure(ret));
    }
  } catch (e) {
    yield put(StatementActions.getAllStatementsFailure('Network Connection Lost!'));
  }
}

export function* deleteStatement({ statementId, isActive, lang }) {
  try {
    const ret = yield call(deleteStatementApi, statementId);
    if (ret && ret.success) {
      yield call(getAllStatements, lang);
      if (isActive) {
        yield call(getActiveStatement);
      }
      yield call(StatementActions.deleteStatementSuccess);
    } else {
      yield put(StatementActions.deleteStatementFailure(ret));
    }
  } catch (e) {
    yield put(StatementActions.deleteStatementFailure('Network Connection Lost!'));
  }
}
