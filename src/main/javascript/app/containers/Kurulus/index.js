/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import KurulusForm from 'components/KurulusForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectKurulusList, makeSelectKurulusTurList } from './redux/selectors';
import reducer from './redux/reducer';
import { getKurulusListAction, kaydetKurulusFormAction, getKurulusTurListAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class Kurulus extends React.Component {
  state = {
    seciliKurulus: null,
    isKurulusEkleDrawer: false,
    kurulusForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getKurulusListAction());
    this.props.dispatch(getKurulusTurListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'ad',
        title: 'Kurulus Ad',
        filterable: true,
        sortable: true,
      },
      {
        key: 'tur.ad',
        title: 'Kurulus Tür Ad',
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
    this.props.dispatch(getKurulusListAction());
  };

  kurulusKaydet = () => {
    this.props.dispatch(kaydetKurulusFormAction(this.state.kurulusForm.data));
  };

  render() {
    /** Function Bindings */
    const { handleOnRefresh, kurulusKaydet } = this;

    /** Props Bindings */
    const { kurulusList, kurulusTurList } = this.props;
    

    const { seciliKurulus, kurulusForm, isKurulusEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Kuruluş Ekle" icon="plus" compact onClick={() => this.setState({ isKurulusEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={kurulusList.data}
          header={<b>Şikayet Tür Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliKurulus: rowData })}
          celled
          export
          loading={kurulusList.isLoading}
        />

        <Drawer open={isKurulusEkleDrawer} onClose={() => this.setState({ isKurulusEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Kuruluş Ekle</Drawer.Header>
          <Drawer.Content>
          <KurulusForm
              resources={{
                kurulusTurler: kurulusTurList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.kurulusForm, 'data', form);
                    _.set(redraft.kurulusForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!kurulusForm.isValid} onClick={kurulusKaydet} />
          </Drawer.Footer>
        </Drawer>

        <Drawer open={seciliKurulus !== null} onClose={() => this.setState({ seciliKurulus: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Kurulus Tür Güncelle</Drawer.Header>
          <Drawer.Content>
            <KurulusForm
              data={seciliKurulus}
              resources={{
                kurulusTurler: kurulusTurList,
              }}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.kurulusForm, 'data', form);
                    _.set(redraft.kurulusForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!kurulusForm.isValid} onClick={kurulusKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

Kurulus.propTypes = {
  dispatch: PropTypes.func.isRequired,
  kurulusList: PropTypes.any,
  kurulusTurList : PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  kurulusList: makeSelectKurulusList(),
  kurulusTurList : makeSelectKurulusTurList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'kurulus', reducer });

export default compose(withReducer, withConnect)(Kurulus);
