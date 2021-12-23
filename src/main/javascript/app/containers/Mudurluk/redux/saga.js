import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { MUDURLUK } from './constants';
import {
  setMudurlukListLoadingAction,
  setMudurlukListDataAction,
} from './actions';

export function* getMudurlukListSaga() {
  yield put(setMudurlukListLoadingAction(true));
  try {
    const resp = yield call(endpoints.mudurlukListele);
    yield put(setMudurlukListDataAction(resp.data));
    yield put(setMudurlukListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setMudurlukListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetMudurlukSaga(mudurlukForm) {
  try {
    const kaydetURL = mudurlukForm.data.id ? endpoints.mudurlukGuncelle : endpoints.mudurlukEkle;
    yield call(kaydetURL, mudurlukForm.data);
    yield call(getMudurlukListSaga);
    if (mudurlukForm.data.id) {
      toast.success('Müdürlük başarıyla güncellenmiştir.');
    } else toast.success('Müdürlük başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export default function* MudurlukSaga() {
  yield all([
    takeLatest(MUDURLUK.SAVE, kaydetMudurlukSaga),
    takeLatest(MUDURLUK.GET_LIST, getMudurlukListSaga),
  ]);
}
