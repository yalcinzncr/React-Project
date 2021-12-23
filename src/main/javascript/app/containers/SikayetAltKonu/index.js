/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import SikayetAltKonuForm from 'components/SikayetAltKonuForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectSikayetAltKonuList, makeSelectSikayetKonuList } from './redux/selectors';
import reducer from './redux/reducer';
import { getSikayetAltKonuListAction, kaydetSikayetAltKonuFormAction, getSikayetKonuListAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class SikayetAltKonu extends React.Component {
  state = {
    seciliSikayetAltKonu: null,
    isSikayetAltKonuEkleDrawer: false,
    sikayetAltKonuForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getSikayetAltKonuListAction());
    this.props.dispatch(getSikayetKonuListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'ad',
        title: 'Sikayet Alt Konu',
        filterable: true,
        sortable: true,
      },
      {
        key: 'konu.ad',
        title: 'Şikayet Konu Ad',
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
    this.props.dispatch(getSikayetAltKonuListAction());
  };

  sikayetAltKonuKaydet = () => {
    this.props.dispatch(kaydetSikayetAltKonuFormAction(this.state.sikayetAltKonuForm.data));
  };

  render() {
    /** Function Bindings */
    const { handleOnRefresh, sikayetAltKonuKaydet } = this;

    /** Props Bindings */
    const { sikayetAltKonuList, sikayetKonuList } = this.props;
    


    

    const { seciliSikayetAltKonu, sikayetAltKonuForm, isSikayetAltKonuEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Şikayet Alt Konu Ekle" icon="plus" compact onClick={() => this.setState({ isSikayetAltKonuEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={sikayetAltKonuList.data}
          header={<b>Şikayet Alt Konu Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliSikayetAltKonu: rowData })}
          celled
          export
          loading={sikayetAltKonuList.isLoading}
        />

        <Drawer open={isSikayetAltKonuEkleDrawer} onClose={() => this.setState({ isSikayetAltKonuEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Şikayet Alt Konu Ekle</Drawer.Header>
          <Drawer.Content>
          <SikayetAltKonuForm
              resources={{
                konular: sikayetKonuList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetAltKonuForm, 'data', form);
                    _.set(redraft.sikayetAltKonuForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!sikayetAltKonuForm.isValid} onClick={sikayetAltKonuKaydet} />
          </Drawer.Footer>
        </Drawer>

        <Drawer open={seciliSikayetAltKonu!== null} onClose={() => this.setState({ seciliSikayetAltKonu: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Sikayet Tür Güncelle</Drawer.Header>
          <Drawer.Content>
            <SikayetAltKonuForm
              data={seciliSikayetAltKonu}
              resources={{
                konular: sikayetKonuList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetAltKonuForm, 'data', form);
                    _.set(redraft.sikayetAltKonuForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!sikayetAltKonuForm.isValid} onClick={sikayetAltKonuKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

SikayetAltKonu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sikayetAltKonuList: PropTypes.any,
  sikayetKonuList : PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  sikayetAltKonuList: makeSelectSikayetAltKonuList(),
  sikayetKonuList : makeSelectSikayetKonuList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sikayetAltKonu', reducer });

export default compose(withReducer, withConnect)(SikayetAltKonu);
