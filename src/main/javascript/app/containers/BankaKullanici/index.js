/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import BankaKullaniciForm from 'components/BankaKullaniciForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectBankaKullaniciList, makeSelectKurulusList } from './redux/selectors';
import reducer from './redux/reducer';
import { getBankaKullaniciListAction, kaydetBankaKullaniciFormAction, getKurulusListAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class BankaKullanici extends React.Component {
  state = {
    seciliBankaKullanici: null,
    isBankaKullaniciEkleDrawer : false,
    bankaKullaniciForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getBankaKullaniciListAction());
    this.props.dispatch(getKurulusListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'adSoyad',
        title: 'Ad Soyad',
        filterable: true,
        sortable: true,
      },
      {
        key: 'eposta',
        title: 'EPosta',
        filterable: true,
        sortable: true,
      },
      {
        key: 'birim',
        title: 'Birim',
        filterable: true,
        sortable: true,
      },
      {
        key: 'unvan',
        title: 'Unvan',
        filterable: true,
        sortable: true,
      },
      {
        key: 'telefon',
        title: 'Numara',
        filterable: true,
        sortable: true,
      },
      {
        key: 'cepTel',
        title: 'Cep Numara',
        filterable: true,
        sortable: true,
      },
      {
        key: 'rol.label',
        title: 'Rol',
        filterable: true,
        sortable: true,
      },
      {
        key: 'aktifPasif.label',
        title: 'Durum',
        filterable: true,
        sortable: true,
      },
    ];
  }

  handleOnRefresh = () => {
    this.props.dispatch(getBankaKullaniciListAction());
  };

  bankaKullaniciKaydet = () => {
    this.props.dispatch(kaydetBankaKullaniciFormAction(this.state.bankaKullaniciForm.data));
  }


  render() {
    /** Function Bindings */
    const {  handleOnRefresh, bankaKullaniciKaydet } = this;

    /** Props Bindings */
    const { bankaKullaniciList, kurulusList } = this.props;

    const { seciliBankaKullanici, bankaKullaniciForm, isBankaKullaniciEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Banka Kullanıcı Ekle" icon="plus" compact onClick={() => this.setState({ isBankaKullaniciEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={bankaKullaniciList.data}
          header={<b>Banka Kullanıcı Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliBankaKullanici: rowData })}
          celled
          export
          loading={bankaKullaniciList.isLoading}
        />

         <Drawer open={isBankaKullaniciEkleDrawer} onClose={() => this.setState({ isBankaKullaniciEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Banka Kullanıcı Ekle</Drawer.Header>
          <Drawer.Content>
            <BankaKullaniciForm
              resources={{
                kurulusList: kurulusList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.bankaKullaniciForm, 'data', form);
                    _.set(redraft.bankaKullaniciForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!bankaKullaniciForm.isValid} onClick={bankaKullaniciKaydet} />
          </Drawer.Footer>
        </Drawer> 

        <Drawer open={seciliBankaKullanici !== null} onClose={() => this.setState({ seciliBankaKullanici: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Banka Kullanıcı Güncelle</Drawer.Header>
          <Drawer.Content>
            <BankaKullaniciForm
              resources={{
                kurulusList: kurulusList,
              }}
              data={seciliBankaKullanici}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.bankaKullaniciForm, 'data', form);
                    _.set(redraft.bankaKullaniciForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!bankaKullaniciForm.isValid} onClick={bankaKullaniciKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

BankaKullanici.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bankaKullaniciList: PropTypes.any,
  kurulusList : PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  bankaKullaniciList: makeSelectBankaKullaniciList(),
  kurulusList: makeSelectKurulusList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bankaKullanici', reducer });

export default compose(withReducer, withConnect)(BankaKullanici);
