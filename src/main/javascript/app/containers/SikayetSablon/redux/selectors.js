import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSikayetSablonDomain = state => state.get('sikayetSablon', initialState);

const makeSelectSikayetSablonList = () => createSelector(selectSikayetSablonDomain, substate => substate.sikayetSablonList);
const makeSelectSikayetAltKonuList = () => createSelector(selectSikayetSablonDomain, substate => substate.altKonuList);
const makeSelectSikayetKonuList = () => createSelector(selectSikayetSablonDomain, substate => substate.konuList);
const makeSelectSikayetTurList = () => createSelector(selectSikayetSablonDomain, substate => substate.turList);

export { makeSelectSikayetSablonList, makeSelectSikayetAltKonuList, makeSelectSikayetKonuList, makeSelectSikayetTurList };
