/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import MudurlukForm from 'components/MudurlukForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectMudurlukList } from './redux/selectors';
import reducer from './redux/reducer';
import { getMudurlukListAction, kaydetMudurlukFormAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class Mudurluk extends React.Component {
  state = {
    seciliMudurluk: null,
    isMudurlukEkleDrawer : false,
    mudurlukForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getMudurlukListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'ad',
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
    this.props.dispatch(getMudurlukListAction());
  };

  mudurlukKaydet = () => {
    this.props.dispatch(kaydetMudurlukFormAction(this.state.mudurlukForm.data));
  }


  render() {
    /** Function Bindings */
    const {  handleOnRefresh, mudurlukKaydet } = this;

    /** Props Bindings */
    const { mudurlukList } = this.props;

    const { seciliMudurluk, mudurlukForm, isMudurlukEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Müdürlük Ekle" icon="plus" compact onClick={() => this.setState({ isMudurlukEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={mudurlukList.data}
          header={<b>Müdürlük Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliMudurluk: rowData })}
          celled
          export
          loading={mudurlukList.isLoading}
        />

         <Drawer open={isMudurlukEkleDrawer} onClose={() => this.setState({ isMudurlukEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Müdürlük Ekle</Drawer.Header>
          <Drawer.Content>
            <MudurlukForm
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.mudurlukForm, 'data', form);
                    _.set(redraft.mudurlukForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!mudurlukForm.isValid} onClick={mudurlukKaydet} />
          </Drawer.Footer>
        </Drawer> 

        <Drawer open={seciliMudurluk !== null} onClose={() => this.setState({ seciliMudurluk: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Müdürlük Güncelle</Drawer.Header>
          <Drawer.Content>
            <MudurlukForm
              data={seciliMudurluk}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.mudurlukForm, 'data', form);
                    _.set(redraft.mudurlukForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!mudurlukForm.isValid} onClick={mudurlukKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

Mudurluk.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mudurlukList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  mudurlukList: makeSelectMudurlukList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mudurluk', reducer });

export default compose(withReducer, withConnect)(Mudurluk);
