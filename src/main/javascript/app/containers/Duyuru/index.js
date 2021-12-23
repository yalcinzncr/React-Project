/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import DuyuruForm from 'components/DuyuruForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectDuyuruList } from './redux/selectors';
import reducer from './redux/reducer';
import { getDuyuruListAction, kaydetDuyuruFormAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class Duyuru extends React.Component {
  state = {
    seciliDuyuru: null,
    isDuyuruEkleDrawer : false,
    duyuruForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getDuyuruListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'baslik',
        title: 'Başlık',
        filterable: true,
        sortable: true,
      },
      {
        key: 'icerik',
        title: 'İçerik',
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
    this.props.dispatch(getDuyuruListAction());
  };

  duyuruKaydet = () => {
    this.props.dispatch(kaydetDuyuruFormAction(this.state.duyuruForm.data));
  }


  render() {
    /** Function Bindings */
    const {  handleOnRefresh, duyuruKaydet } = this;

    /** Props Bindings */
    const { duyuruList } = this.props;

    const { seciliDuyuru, duyuruForm, isDuyuruEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Duyuru Ekle" icon="plus" compact onClick={() => this.setState({ isDuyuruEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={duyuruList.data}
          header={<b>Duyuru Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliDuyuru: rowData })}
          celled
          export
          loading={duyuruList.isLoading}
        />

         <Drawer open={isDuyuruEkleDrawer} onClose={() => this.setState({ isDuyuruEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Duyuru Ekle</Drawer.Header>
          <Drawer.Content>
            <DuyuruForm
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.duyuruForm, 'data', form);
                    _.set(redraft.duyuruForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!duyuruForm.isValid} onClick={duyuruKaydet} />
          </Drawer.Footer>
        </Drawer> 

        <Drawer open={seciliDuyuru !== null} onClose={() => this.setState({ seciliDuyuru: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Duyuru Güncelle</Drawer.Header>
          <Drawer.Content>
            <DuyuruForm
              data={seciliDuyuru}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.duyuruForm, 'data', form);
                    _.set(redraft.duyuruForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!duyuruForm.isValid} onClick={duyuruKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

Duyuru.propTypes = {
  dispatch: PropTypes.func.isRequired,
  duyuruList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  duyuruList: makeSelectDuyuruList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'duyuru', reducer });

export default compose(withReducer, withConnect)(Duyuru);
