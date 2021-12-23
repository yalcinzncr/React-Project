import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { DUYURU } from './constants';
import {
  setDuyuruListLoadingAction,
  setDuyuruListDataAction,
} from './actions';

export function* getDuyuruListSaga() {
  yield put(setDuyuruListLoadingAction(true));
  try {
    const resp = yield call(endpoints.duyuruListele);
    yield put(setDuyuruListDataAction(resp.data));
    yield put(setDuyuruListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setDuyuruListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetDuyuruSaga(duyuruForm) {
  try {
    const kaydetURL = duyuruForm.data.id ? endpoints.duyuruGuncelle : endpoints.duyuruEkle;
    yield call(kaydetURL, duyuruForm.data);
    yield call(getDuyuruListSaga);
    if (duyuruForm.data.id) {
      toast.success('Duyuru başarıyla güncellenmiştir.');
    } else toast.success('Duyuru başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export default function* DuyuruSaga() {
  yield all([
    takeLatest(DUYURU.SAVE, kaydetDuyuruSaga),
    takeLatest(DUYURU.GET_LIST, getDuyuruListSaga),
  ]);
}
