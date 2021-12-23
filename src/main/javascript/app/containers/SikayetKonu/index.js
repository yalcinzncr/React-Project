/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import SikayetKonuForm from 'components/SikayetKonuForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectSikayetKonuList, makeSelectSikayetTurList } from './redux/selectors';
import reducer from './redux/reducer';
import { getSikayetKonuListAction, kaydetSikayetKonuFormAction, getSikayetTurListAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class SikayetKonu extends React.Component {
  state = {
    seciliSikayetKonu: null,
    isSikayetKonuEkleDrawer: false,
    sikayetKonuForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getSikayetKonuListAction());
    this.props.dispatch(getSikayetTurListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'ad',
        title: 'Şikayet Konu Ad',
        filterable: true,
        sortable: true,
      },
      {
        key: 'tur.ad',
        title: 'Şikayet Tür Ad',
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
    this.props.dispatch(getSikayetKonuListAction());
  };

  sikayetKonuKaydet = () => {
    this.props.dispatch(kaydetSikayetKonuFormAction(this.state.sikayetKonuForm.data));
  };

  render() {
    /** Function Bindings */
    const { handleOnRefresh, sikayetKonuKaydet } = this;

    /** Props Bindings */
    const { sikayetKonuList, sikayetTurList } = this.props;
    

    const { seciliSikayetKonu, sikayetKonuForm, isSikayetKonuEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Şikayet Konu Ekle" icon="plus" compact onClick={() => this.setState({ isSikayetKonuEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={sikayetKonuList.data}
          header={<b>Şikayet Konu Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliSikayetKonu: rowData })}
          celled
          export
          loading={sikayetKonuList.isLoading}
        />

        <Drawer open={isSikayetKonuEkleDrawer} onClose={() => this.setState({ isSikayetKonuEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Şikayet Konu Ekle</Drawer.Header>
          <Drawer.Content>
          <SikayetKonuForm
              resources={{
                sikayetTurler: sikayetTurList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetKonuForm, 'data', form);
                    _.set(redraft.sikayetKonuForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!sikayetKonuForm.isValid} onClick={sikayetKonuKaydet} />
          </Drawer.Footer>
        </Drawer>

        <Drawer open={seciliSikayetKonu !== null} onClose={() => this.setState({ seciliSikayetKonu: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Şikayet Konu Güncelle</Drawer.Header>
          <Drawer.Content>
            <SikayetKonuForm
              data={seciliSikayetKonu}
              resources={{
                sikayetTurler: sikayetTurList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetKonuForm, 'data', form);
                    _.set(redraft.sikayetKonuForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!sikayetKonuForm.isValid} onClick={sikayetKonuKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

SikayetKonu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sikayetKonuList: PropTypes.any,
  sikayetTurList : PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  sikayetKonuList: makeSelectSikayetKonuList(),
  sikayetTurList : makeSelectSikayetTurList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sikayetKonu', reducer });

export default compose(withReducer, withConnect)(SikayetKonu);
