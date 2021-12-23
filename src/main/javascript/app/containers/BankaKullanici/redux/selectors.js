import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBankaKullaniciDomain = state => state.get('bankaKullanici', initialState);

const makeSelectBankaKullaniciList = () => createSelector(selectBankaKullaniciDomain, substate => substate.bankaKullaniciList);
const makeSelectKurulusList = () => createSelector(selectBankaKullaniciDomain, substate => substate.kurulusList);

export { makeSelectBankaKullaniciList, makeSelectKurulusList };
