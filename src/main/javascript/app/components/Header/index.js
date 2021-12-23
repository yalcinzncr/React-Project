/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container, *****Logo, Menu, Icon, Item, Dropdown, Responsive } from '*****-ui-components';
import { injectUser } from 'contexts/userContext';
import { deleteEDSAuthCookies } from './functions';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  signout = () => {
    deleteEDSAuthCookies();
  };

  render() {
    const { name } = this.props.site;
    const { userInfo = {} } = this.props;

    const userMenu = (
      <>
        {/* {this.state.userPictureLoaded ? (
          <Item.Image
            size="tiny"
            onError={() => {
              this.setState({ userPictureLoaded: false });
            }}
            onLoad={() => {
              this.setState({ userPictureLoading: false });
            }}
            hidden={this.state.userPictureLoading}
            src={userInfo.pictureUrl}
          />
        ) : (
          <Item.Image size="tiny" style={{ marginRight: 0, verticalAlign: 'middle' }}>
            <Icon name="user circle" size="big" />
          </Item.Image>
        )} */}
        <Responsive as={Item.Content} minWidth={768} verticalAlign="middle">
          <div className="user-name">{userInfo.adSoyad}</div>
        </Responsive>
      </>
    );

    // const notificationMenu = (
    //   <Responsive as={Item.Content} minWidth={768}>
    //     <Icon link name="bell outline" />
    //     <Label color="red" floating circular>
    //       4
    //     </Label>
    //   </Responsive>
    // );

    const userMenuOptions = [
      // { key: 'user', text: 'Profil', icon: 'user' },
      { key: 'sign-out', text: 'Çıkış Yap', icon: 'sign out', onClick: this.signout },
    ];
    // const notificationMenuOptions = [
    //   {
    //     key: 'notification1',
    //     text: '234256 numaralı talebiniz onaylanmıştır.',
    //     description: '2 dakika önce',
    //     icon: 'check circle',
    //     status: 1,
    //   },
    //   {
    //     key: 'notification2',
    //     text: '234256 numaralı talebiniz reddedilmiştir.',
    //     description: '2 dakika önce',
    //     icon: 'times circle',
    //     status: 0,
    //   },
    //   {
    //     key: 'notification3',
    //     text: '234256 numaralı işlem kaydı için onay vermeniz gerekmektedir.',
    //     description: '2 dakika önce',
    //     icon: 'clock',
    //   },
    // ];

    return (
      <Menu id="header" className="header header-fixed" fixed="top">
        <Container fluid>
          <Responsive as={Menu.Item} minWidth={768} className="logo">
            <*****Logo />
            <*****Logo className="sm" amblem />
          </Responsive>

          <Menu.Item className="name">
            <Icon link name="bars" onClick={this.props.navCollapse} />
            {name}
          </Menu.Item>

          <Menu.Menu position="right">
            {/* <Responsive as={Menu.Item} minWidth={768} className="message">
              <Icon link name="envelope outline" />
              <Label color="red" floating circular>
                22
              </Label>
            </Responsive>

            <Dropdown className="link item selection notification" trigger={notificationMenu} icon={null}>
              <Dropdown.Menu>
                <Dropdown.Header content="BİLDİRİMLER" />
                <Dropdown.Divider />
                <Dropdown.Menu scrolling>
                  {notificationMenuOptions.map(option => (
                    <Dropdown.Item key={option.key} className={(option.status === 1 && 'green') || (option.status === 0 && 'red') || ''}>
                      <div className="notification-menu">
                        <div className="notification-menu-icon">
                          <Icon name={option.icon} />
                        </div>
                        <div className="notification-menu-content">
                          <div className="text">{option.text}</div>
                          <div className="date">{option.description}</div>
                        </div>
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown> */}

            <Dropdown className="link item selection user" trigger={userMenu} icon={null}>
              <Dropdown.Menu>
                <Dropdown.Header
                  content={
                    <div className="info">
                      <div>ROLLER</div>
                      {userInfo.roller && userInfo.roller.map(role => <span key={role}>{role}</span>)}
                    </div>
                  }
                />
                <Dropdown.Menu scrolling>
                  {userMenuOptions.map(option => (
                    <Dropdown.Item key={option.key} {...option} />
                  ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

Header.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string,
  }),
  navCollapse: PropTypes.func,
  userInfo: PropTypes.object,
};

export default injectUser(Header);
