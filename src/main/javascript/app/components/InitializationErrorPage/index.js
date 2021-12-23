import React from 'react';
import PropTypes from 'prop-types';

const centerStyle = {
  width: '700px',
  textAlign: 'center',
};

/* eslint-disable react/prefer-stateless-function */
class InitializationErrorPage extends React.PureComponent {
  render() {
    return (
      <div className="centered-clazz" style={centerStyle}>
        <h4>{this.props.message}</h4>
      </div>
    );
  }
}

InitializationErrorPage.propTypes = {
  message: PropTypes.string,
};

InitializationErrorPage.defaultProps = {
  message: '',
};

export default InitializationErrorPage;
