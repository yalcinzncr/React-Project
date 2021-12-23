import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.get('router');
const selectAppDomain = state => state.get('app', initialState);

const makeSelectLocation = () => createSelector(selectRouter, routerState => routerState.get('location'));

const makeSelectApp = () => createSelector(selectAppDomain, substate => substate);

export { makeSelectLocation, makeSelectApp };
