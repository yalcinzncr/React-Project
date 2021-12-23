import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSikayetAltKonuDomain = state => state.get('sikayetAltKonu', initialState);

const makeSelectSikayetAltKonuList = () => createSelector(selectSikayetAltKonuDomain, substate => substate.sikayetAltKonuList);
const makeSelectSikayetKonuList = () => createSelector(selectSikayetAltKonuDomain, substate => substate.sikayetKonuList);

export { makeSelectSikayetAltKonuList, makeSelectSikayetKonuList };
