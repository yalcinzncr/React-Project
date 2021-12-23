/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AnaSayfa from 'containers/AnaSayfa';
import Mudurluk from 'containers/Mudurluk/Loadable';
import SikayetTur from 'containers/SikayetTur/Loadable';
import KurulusTur from 'containers/KurulusTur/Loadable';
import Kurulus from 'containers/Kurulus/Loadable';
import SikayetKonu from 'containers/SikayetKonu/Loadable';
import SikayetAltKonu from 'containers/SikayetAltKonu/Loadable';
import Duyuru from 'containers/Duyuru/Loadable';
import BankaKullanici from 'containers/BankaKullanici/Loadable';
import SikayetSablon from 'containers/SikayetSablon/Loadable';
import SikayetDegerlendirme from 'containers/SikayetDegerlendirme/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import mudurlukSaga from 'containers/Mudurluk/redux/saga';
import sikayetTurSaga from 'containers/SikayetTur/redux/saga';
import kurulusTurSaga from 'containers/KurulusTur/redux/saga';
import kurulusSaga from 'containers/Kurulus/redux/saga';
import sikayetKonuSaga from 'containers/SikayetKonu/redux/saga';
import sikayetAltKonuSaga from 'containers/SikayetAltKonu/redux/saga';
import duyuruSaga from 'containers/Duyuru/redux/saga';
import bankaKullaniciSaga from 'containers/BankaKullanici/redux/saga';
import sikayetSablonSaga from 'containers/SikayetSablon/redux/saga';
import sikayetDegerlendirmeSaga from 'containers/SikayetDegerlendirme/redux/saga';

import FullPageLoader from 'components/FullPageLoader/Loadable';
import InitializationErrorPage from 'components/InitializationErrorPage/Loadable';
import { Layouts } from '*****-ui-components';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import { ToastContainer } from 'react-toastify';

import { UserContext } from 'contexts/userContext';
import { makeSelectApp, makeSelectLocation } from './redux/selectors';
import reducer from './redux/reducer';
import saga from './redux/saga';

import messages from './messages';

import { resizeEvent, navCollapse } from './functions';
import { fetchKullaniciAction } from './redux/actions';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchKullaniciAction());
  }

  resizeEventHandler = () => {
    const header = ReactDOM.findDOMNode(this.header);
    const nav = ReactDOM.findDOMNode(this.navigation).parentNode;
    resizeEvent(header, nav);
  };

  render() {
    const { resizeEventHandler } = this;
    const { kullanici } = this.props.appReducer;

    if (!kullanici.data) {
      return null;
    }

    if (kullanici.loading) {
      return <FullPageLoader />;
    }

    if (kullanici.error) {
      return <InitializationErrorPage message="Kullanıcı bilgileri alınırken hata meydana geldi. Lütfen daha sonra tekrar deneyiniz." />;
    }

    const site = { name: this.props.intl.formatMessage(messages.siteName) };
    return (
      <React.Fragment>
        <ToastContainer />

        <UserContext.Provider value={kullanici.data}>
          <Layouts>
            <Header
              grid="header"
              site={site}
              navCollapse={() => navCollapse(ReactDOM.findDOMNode(this.header), ReactDOM.findDOMNode(this.navigation).parentNode)}
              ref={node => {
                this.header = node;
              }}
            />

            <Navigation
              grid="nav"
              data={this.props.appReducer.menu.data}
              searchNoResultsMessage={this.props.intl.formatMessage(messages.searchNoResultsMessage)}
              searchPlaceholder={this.props.intl.formatMessage(messages.searchPlaceholder)}
              ref={node => {
                this.navigation = node;
              }}
            />

            <Switch grid="1" gridwidth={16}>
              <Route exact path="/" component={AnaSayfa} />
              <Route exact path="/mudurluk" component={Mudurluk} />
              <Route exact path="/sikayetTur" component={SikayetTur} />
              <Route exact path="/kurulusTur" component={KurulusTur} />
              <Route exact path="/kurulus" component={Kurulus} />
              <Route exact path="/sikayetKonu" component={SikayetKonu} />
              <Route exact path="/sikayetAltKonu" component={SikayetAltKonu} />
              <Route exact path="/duyuru" component={Duyuru} />
              <Route exact path="/sikayetSablon" component={SikayetSablon} />
              <Route exact path="/sikayetDegerlendirme" component={SikayetDegerlendirme} />
              <Route exact path="/bankaKullanici" component={BankaKullanici} />
              <Route component={NotFoundPage} />
            </Switch>
          </Layouts>
        </UserContext.Provider>
        {/** Resize event handler... Kullanici gelene kadar ki gecen surede nav ve header render olmadıgı icin alt kisimda tanimliyoruz. */}
        {window.removeEventListener('resize', resizeEventHandler, true)}
        {window.addEventListener('resize', resizeEventHandler)}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  intl: intlShape.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  appReducer: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  appReducer: makeSelectApp(),
  appLocationReducer: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });


/** App ye tum sagalar inject ediliyor cunku ilgili saga diger componente inject edilginde saga fonksiyonu defalarca cagriliyor. */
const withMudurlukSaga = injectSaga({ key: 'mudurluk', saga: mudurlukSaga });
const withSikayetTurSaga = injectSaga({ key: 'sikayetTur', saga: sikayetTurSaga });
const withKurulusTurSaga = injectSaga({ key: 'kurulusTur', saga: kurulusTurSaga });
const withKurulusSaga = injectSaga({ key: 'kurulus', saga: kurulusSaga });
const withSikayetKonuSaga = injectSaga({ key: 'sikayetKonu', saga: sikayetKonuSaga });
const withSikayetAltKonuSaga = injectSaga({ key: 'sikayetAltKonu', saga: sikayetAltKonuSaga });
const withDuyuruSaga = injectSaga({ key: 'duyuru', saga: duyuruSaga });
const withSikayetSablonSaga = injectSaga({ key: 'sikayetSablon', saga: sikayetSablonSaga });
const withSikayetDegerlendirmeSaga = injectSaga({ key: 'sikayetDegerlendirme', saga: sikayetDegerlendirmeSaga });
const withBankaKullaniciSaga = injectSaga({ key: 'bankaKullanici', saga: bankaKullaniciSaga });

export default compose(
  withReducer, 
  withSaga, 
  withMudurlukSaga,
  withSikayetTurSaga,
  withKurulusTurSaga,
  withKurulusSaga,
  withSikayetKonuSaga,
  withSikayetAltKonuSaga,
  withDuyuruSaga,
  withSikayetSablonSaga,
  withSikayetDegerlendirmeSaga,
  withBankaKullaniciSaga,
  withConnect)(injectIntl(App));
