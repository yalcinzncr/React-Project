/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import reducer from './redux/reducer';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import SikayetSablonForm from 'components/SikayetSablonForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectSikayetSablonList, makeSelectSikayetAltKonuList, makeSelectSikayetKonuList, makeSelectSikayetTurList } from './redux/selectors';
import { getSikayetSablonListAction, kaydetSikayetSablonFormAction, getSikayetAltKonuListAction, getSikayetKonuListAction, getSikayetTurListAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class SikayetSablon extends React.Component {
  state = {
    seciliSikayetSablon: null,
    isSikayetSablonEkleDrawer: false,
    sikayetSablonForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getSikayetSablonListAction());
    this.props.dispatch(getSikayetAltKonuListAction());
    this.props.dispatch(getSikayetKonuListAction());
    this.props.dispatch(getSikayetTurListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'metin',
        title: 'Sikayet Şablon Metin',
        filterable: true,
        sortable: true,
      },
      {
        key: 'altKonu.ad',
        title: 'Şikayet Alt Konu',
        filterable: true,
        sortable: true,
      },
      {
        key: 'konu.ad',
        title: 'Şikayet Konu',
        filterable: true,
        sortable: true,
      },
      {
        key: 'tur.ad',
        title: 'Şikayet Tür',
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
    this.props.dispatch(getSikayetSablonListAction());
  };

  sikayetSablonKaydet = () => {
    this.props.dispatch(kaydetSikayetSablonFormAction(this.state.sikayetSablonForm.data));
  };

  render() {
    /** Function Bindings */
    const { handleOnRefresh, sikayetSablonKaydet } = this;

    /** Props Bindings */
    const { sikayetSablonList, altKonuList, konuList, turList } = this.props;
    

    const { seciliSikayetSablon, sikayetSablonForm, isSikayetSablonEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Şikayet Şablon Ekle" icon="plus" compact onClick={() => this.setState({ isSikayetSablonEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={sikayetSablonList.data}
          header={<b>Şikayet Şablon Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliSikayetSablon: rowData })}
          celled
          export
          loading={sikayetSablonList.isLoading}
        />

        <Drawer open={isSikayetSablonEkleDrawer} onClose={() => this.setState({ isSikayetSablonEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Şikayet Şablon Ekle</Drawer.Header>
          <Drawer.Content>
          <SikayetSablonForm
              resources={{
                altKonular: altKonuList,
                konular: konuList,
                turler: turList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetSablonForm, 'data', form);
                    _.set(redraft.sikayetSablonForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!sikayetSablonForm.isValid} onClick={sikayetSablonKaydet} />
          </Drawer.Footer>
        </Drawer>

        <Drawer open={seciliSikayetSablon !== null} onClose={() => this.setState({ seciliSikayetSablon: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Sikayet Şablon Güncelle</Drawer.Header>
          <Drawer.Content>
            <SikayetSablonForm
              data={seciliSikayetSablon}
              resources={{
                altKonular: altKonuList,
                konular: konuList,
                turler: turList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetSablonForm, 'data', form);
                    _.set(redraft.sikayetSablonForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!sikayetSablonForm.isValid} onClick={sikayetSablonKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

SikayetSablon.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sikayetSablonList: PropTypes.any,
  altKonuList : PropTypes.any,
  konuList : PropTypes.any,
  turList : PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  sikayetSablonList: makeSelectSikayetSablonList(),
  altKonuList : makeSelectSikayetAltKonuList(),
  konuList : makeSelectSikayetKonuList(),
  turList : makeSelectSikayetTurList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sikayetSablon', reducer });

export default compose(withReducer, withConnect)(SikayetSablon);
