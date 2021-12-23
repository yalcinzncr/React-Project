import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSikayetKonuDomain = state => state.get('sikayetKonu', initialState);

const makeSelectSikayetKonuList = () => createSelector(selectSikayetKonuDomain, substate => substate.sikayetKonuList);
const makeSelectSikayetTurList = () => createSelector(selectSikayetKonuDomain, substate => substate.sikayetTurList);

export { makeSelectSikayetKonuList, makeSelectSikayetTurList };
