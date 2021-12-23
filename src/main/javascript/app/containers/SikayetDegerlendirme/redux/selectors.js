import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSikayetDegerlendirmeDomain = state => state.get('sikayetDegerlendirme', initialState);

const makeSelectSikayetDegerlendirmeList = () => createSelector(selectSikayetDegerlendirmeDomain, substate => substate.sikayetDegerlendirmeList);

export { makeSelectSikayetDegerlendirmeList };
