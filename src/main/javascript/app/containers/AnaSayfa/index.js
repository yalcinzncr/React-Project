import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { UserContext } from 'contexts/userContext';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAnaSayfa } from './redux/selectors';
import reducer from './redux/reducer';
import saga from './redux/saga';

/* eslint-disable react/prefer-stateless-function */
export class AnaSayfa extends React.Component {
  static contextType = UserContext;

  render() {
    return <div>{JSON.stringify(this.context)}</div>;
  }
}

AnaSayfa.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  anaSayfa: makeSelectAnaSayfa(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'anaSayfa', reducer });
const withSaga = injectSaga({ key: 'anaSayfa', saga });

export default compose(withReducer, withSaga, withConnect)(AnaSayfa);
