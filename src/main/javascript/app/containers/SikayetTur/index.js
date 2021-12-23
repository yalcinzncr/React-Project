/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import SikayetTurForm from 'components/SikayetTurForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectSikayetTurList, makeSelectMudurlukList } from './redux/selectors';
import reducer from './redux/reducer';
import { getSikayetTurListAction, kaydetSikayetTurFormAction, getMudurlukListAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class SikayetTur extends React.Component {
  state = {
    seciliSikayetTur: null,
    isSikayetTurEkleDrawer: false,
    sikayetTurForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getSikayetTurListAction());
    this.props.dispatch(getMudurlukListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'ad',
        title: 'Sikayet Tür Ad',
        filterable: true,
        sortable: true,
      },
      {
        key: 'mudurluk.ad',
        title: 'Müdürlük Ad',
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
    this.props.dispatch(getSikayetTurListAction());
  };

  sikayetTurKaydet = () => {
    this.props.dispatch(kaydetSikayetTurFormAction(this.state.sikayetTurForm.data));
  };

  render() {
    /** Function Bindings */
    const { handleOnRefresh, sikayetTurKaydet } = this;

    /** Props Bindings */
    const { sikayetTurList, mudurlukList } = this.props;
    

    const { seciliSikayetTur, sikayetTurForm, isSikayetTurEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Şikayet Tür Ekle" icon="plus" compact onClick={() => this.setState({ isSikayetTurEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={sikayetTurList.data}
          header={<b>Şikayet Tür Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliSikayetTur: rowData })}
          celled
          export
          loading={sikayetTurList.isLoading}
        />

        <Drawer open={isSikayetTurEkleDrawer} onClose={() => this.setState({ isSikayetTurEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Şikayet Tür Ekle</Drawer.Header>
          <Drawer.Content>
          <SikayetTurForm
              resources={{
                mudurlukler: mudurlukList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetTurForm, 'data', form);
                    _.set(redraft.sikayetTurForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!sikayetTurForm.isValid} onClick={sikayetTurKaydet} />
          </Drawer.Footer>
        </Drawer>

        <Drawer open={seciliSikayetTur !== null} onClose={() => this.setState({ seciliSikayetTur: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Sikayet Tür Güncelle</Drawer.Header>
          <Drawer.Content>
            <SikayetTurForm
              data={seciliSikayetTur}
              resources={{
                mudurlukler: mudurlukList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetTurForm, 'data', form);
                    _.set(redraft.sikayetTurForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!sikayetTurForm.isValid} onClick={sikayetTurKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

SikayetTur.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sikayetTurList: PropTypes.any,
  mudurlukList : PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  sikayetTurList: makeSelectSikayetTurList(),
  mudurlukList : makeSelectMudurlukList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sikayetTur', reducer });

export default compose(withReducer, withConnect)(SikayetTur);
