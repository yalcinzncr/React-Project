/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, DataTable, Icon, Drawer } from '*****-ui-components';
import SikayetDegerlendirmeForm from 'components/SikayetDegerlendirmeForm/Loadable';

import injectReducer from 'utils/injectReducer';
import { makeSelectSikayetDegerlendirmeList } from './redux/selectors';
import reducer from './redux/reducer';
import { getSikayetDegerlendirmeListAction, kaydetSikayetDegerlendirmeFormAction } from './redux/actions';
/* eslint-disable react/prefer-stateless-function */
export class SikayetDegerlendirme extends React.Component {
  state = {
    seciliSikayetDegerlendirme: null,
    isSikayetDegerlendirmeEkleDrawer : false,
    sikayetDegerlendirmeForm: {
      data: null,
      isValid: null,
    },
  };

  componentDidMount() {
    this.props.dispatch(getSikayetDegerlendirmeListAction());
  }

  getTableColumns() {
    return [
      {
        key: 'ad',
        title: 'Şikayet Değerlendirme Ad',
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
    this.props.dispatch(getSikayetDegerlendirmeListAction());
  };

  sikayetDegerlendirmeKaydet = () => {
    this.props.dispatch(kaydetSikayetDegerlendirmeFormAction(this.state.sikayetDegerlendirmeForm.data));
  }


  render() {
    /** Function Bindings */
    const {  handleOnRefresh, sikayetDegerlendirmeKaydet } = this;

    /** Props Bindings */
    const { sikayetDegerlendirmeList } = this.props;

    const { seciliSikayetDegerlendirme, sikayetDegerlendirmeForm, isSikayetDegerlendirmeEkleDrawer } = this.state;

    return (
      <React.Fragment>
        <Button content="Şikayet Değerlendirme Ekle" icon="plus" compact onClick={() => this.setState({ isSikayetDegerlendirmeEkleDrawer: true })} />
        <DataTable
          striped
          selectable
          getRowKey={rowData => `key-${rowData.id}`}
          columns={this.getTableColumns()}
          data={sikayetDegerlendirmeList.data}
          header={<b>Şikayet Değerlendirme Listesi</b>}
          headerActions={<Icon link name="sync" onClick={handleOnRefresh} />}
          onRowClick={(rowData, _cellData) => this.setState({ seciliSikayetDegerlendirme: rowData })}
          celled
          export
          loading={sikayetDegerlendirmeList.isLoading}
        />

         <Drawer open={isSikayetDegerlendirmeEkleDrawer} onClose={() => this.setState({ isSikayetDegerlendirmeEkleDrawer: false })} closeOnDimmerClick={false}>
          <Drawer.Header>Şikayet Değerlendirme Ekle</Drawer.Header>
          <Drawer.Content>
            <SikayetDegerlendirmeForm
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetDegerlendirmeForm, 'data', form);
                    _.set(redraft.sikayetDegerlendirmeForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Ekle" icon="edit" compact disabled={!sikayetDegerlendirmeForm.isValid} onClick={sikayetDegerlendirmeKaydet} />
          </Drawer.Footer>
        </Drawer> 

        <Drawer open={seciliSikayetDegerlendirme !== null} onClose={() => this.setState({ seciliSikayetDegerlendirme: null })} closeOnDimmerClick={false}>
          <Drawer.Header>Şikayet Değerlendirme Güncelle</Drawer.Header>
          <Drawer.Content>
            <SikayetDegerlendirmeForm
              data={seciliSikayetDegerlendirme}
              onChange={(form, isValid) => {
                this.setState(
                  produce(draft => {
                    const redraft = draft;
                    _.set(redraft.sikayetDegerlendirmeForm, 'data', form);
                    _.set(redraft.sikayetDegerlendirmeForm, 'isValid', isValid);
                    return redraft;
                  }),
                );
              }}
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Button content="Güncelle" icon="edit" compact disabled={!sikayetDegerlendirmeForm.isValid} onClick={sikayetDegerlendirmeKaydet} />
          </Drawer.Footer>
        </Drawer>
      </React.Fragment>
    );
  }
}

SikayetDegerlendirme.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sikayetDegerlendirmeList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  sikayetDegerlendirmeList: makeSelectSikayetDegerlendirmeList(),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sikayetDegerlendirme', reducer });

export default compose(withReducer, withConnect)(SikayetDegerlendirme);
