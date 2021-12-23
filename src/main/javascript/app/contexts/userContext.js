import React from 'react';

export const UserContext = React.createContext({});

export function injectUser(Component) {
  return React.forwardRef((props, ref) => (
    <UserContext.Consumer>{contextValue => <Component {...props} ref={ref} userInfo={contextValue} />}</UserContext.Consumer>
  ));
}
