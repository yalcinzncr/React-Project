import { call, put, takeLatest } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import {  loadingKullaniciAction, setKullaniciAction, errorKullaniciAction } from './actions';
import { FETCH_KULLANICI } from './constants';

export function* fetchKullanici() {
  yield put(loadingKullaniciAction(true));
  try {
    const response = yield call(endpoints.fetchKullanici);

    yield put(setKullaniciAction(response.data));

    yield put(errorKullaniciAction(false));
  } catch (error) {
    yield put(errorKullaniciAction(true));
  }
  yield put(loadingKullaniciAction(false));
}

export default function* appSaga() {
  yield takeLatest(FETCH_KULLANICI.REQUEST, fetchKullanici);
}
