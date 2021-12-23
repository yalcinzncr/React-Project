import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { SIKAYET_DEGERLENDIRME } from './constants';
import {
  setSikayetDegerlendirmeListLoadingAction,
  setSikayetDegerlendirmeListDataAction,
} from './actions';

export function* getSikayetDegerlendirmeListSaga() {
  yield put(setSikayetDegerlendirmeListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetDegerlendirmeListele);
    yield put(setSikayetDegerlendirmeListDataAction(resp.data));
    yield put(setSikayetDegerlendirmeListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setSikayetDegerlendirmeListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetSikayetDegerlendirmeSaga(sikayetDegerlendirmeForm) {
  try {
    const kaydetURL = sikayetDegerlendirmeForm.data.id ? endpoints.sikayetDegerlendirmeGuncelle : endpoints.sikayetDegerlendirmeEkle;
    yield call(kaydetURL, sikayetDegerlendirmeForm.data);
    yield call(getSikayetDegerlendirmeListSaga);
    if (sikayetDegerlendirmeForm.data.id) {
      toast.success('Şikayet Değerlendirme başarıyla güncellenmiştir.');
    } else toast.success('Şikayet Değerlendirme başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export default function* SikayetDegerlendirmeSaga() {
  yield all([
    takeLatest(SIKAYET_DEGERLENDIRME.SAVE, kaydetSikayetDegerlendirmeSaga),
    takeLatest(SIKAYET_DEGERLENDIRME.GET_LIST, getSikayetDegerlendirmeListSaga),
  ]);
}
