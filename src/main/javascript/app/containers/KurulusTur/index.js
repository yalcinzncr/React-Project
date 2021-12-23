/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import KurulusTurForm from 'components/KurulusTurForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectKurulusTurList } from './redux/selectors';
import reducer from './redux/reducer';
import { getKurulusTurListAction, kaydetKurulusTurFormAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class KurulusTur extends React.Component {
  state = {
    seciliKurulusTur: null,
    isKurulusTurEkleDrawer : false,
    kurulusTurForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getKurulusTurListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'ad',
        title: 'Kuruluş Tür Ad',
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
    this.props.dispatch(getKurulusTurListAction());
  };

  kurulusTurKaydet = () => {
    this.props.dispatch(kaydetKurulusTurFormAction(this.state.kurulusTurForm.data));
  }


  render() {
    /** Function Bindings */
    const {  handleOnRefresh, kurulusTurKaydet } = this;

    /** Props Bindings */
    const { kurulusTurList } = this.props;

    const { seciliKurulusTur, kurulusTurForm, isKurulusTurEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Kuruluş Tür Ekle" icon="plus" compact onClick={() => this.setState({ isKurulusTurEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={kurulusTurList.data}
          header={<b>Kurulus Tur Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliKurulusTur: rowData })}
          celled
          export
          loading={kurulusTurList.isLoading}
        />

         <Drawer open={isKurulusTurEkleDrawer} onClose={() => this.setState({ isKurulusTurEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Kuruluş Tür Ekle</Drawer.Header>
          <Drawer.Content>
            <KurulusTurForm
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.kurulusTurForm, 'data', form);
                    _.set(redraft.kurulusTurForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!kurulusTurForm.isValid} onClick={kurulusTurKaydet} />
          </Drawer.Footer>
        </Drawer> 

        <Drawer open={seciliKurulusTur !== null} onClose={() => this.setState({ seciliKurulusTur: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Kuruluş Tür Güncelle</Drawer.Header>
          <Drawer.Content>
            <KurulusTurForm
              data={seciliKurulusTur}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.kurulusTurForm, 'data', form);
                    _.set(redraft.kurulusTurForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!kurulusTurForm.isValid} onClick={kurulusTurKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

KurulusTur.propTypes = {
  dispatch: PropTypes.func.isRequired,
  kurulusTurList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  kurulusTurList: makeSelectKurulusTurList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'kurulusTur', reducer });

export default compose(withReducer, withConnect)(KurulusTur);
