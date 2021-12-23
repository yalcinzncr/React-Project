/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { createSelector } from 'reselect';

// import messages from './messages';
// import { appLocales } from '../../i18n';
import { changeLocale } from './actions';
import { makeSelectLocale } from './selectors';

export function LocaleToggle(props) {
  const languageOptions = [
    { key: 'en', text: 'English', value: 'en' },
    { key: 'tr', text: 'Türkçe', value: 'tr' },
  ];
  return (
    <Dropdown
      button
      onChange={props.onLocaleToggle}
      value={props.locale === 'tr' ? 'en' : 'tr'}
      className="icon"
      floating
      labeled
      icon="world"
      options={languageOptions}
    />
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt, { value }) => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
