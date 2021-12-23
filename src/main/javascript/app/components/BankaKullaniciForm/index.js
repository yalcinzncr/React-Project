/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import _ from 'lodash';
import { defaultValidationState, nonValidState, validState, emailRegex } from 'utils/constants';
import { Form, Radio, Label } from '*****-ui-components';

const noResultMessage = 'Sonuç bulunamadı.';

/* eslint-disable react/prefer-stateless-function */
export class BankaKullaniciForm extends React.Component {
  state = {
    form: {
      id : null,
      adSoyad: null,
      eposta: null,
      birim: null,
      unvan: null,
      telefon: null,
      cepTel: null,
      rol: {
        id: null,
      },
      kurulus:{
        id: null
      },
      aktifPasif: {
        id: null,
      },
    },
    validation: {
      adSoyad: defaultValidationState(),
      eposta: defaultValidationState(),
      'rol.id': defaultValidationState(),
      'kurulus.id': defaultValidationState(),
      'aktifPasif.id': defaultValidationState(),
    },
    isFormValid: false,
  };

  componentDidMount() {
    const { mapInitialFormState } = this;
    mapInitialFormState();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      const { mapInitialFormState } = this;
      mapInitialFormState();
    }
  }

  mapInitialFormState = () => {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    const { validate } = this;

    return this.setState(
      produce(draft => {
        const redraft = draft;
        _.set(redraft.form, 'id', _.get(data, 'id', null));
        _.set(redraft.form, 'adSoyad', _.get(data, 'adSoyad', null));
        _.set(redraft.form, 'eposta', _.get(data, 'eposta', null));
        _.set(redraft.form, 'birim', _.get(data, 'birim', null));
        _.set(redraft.form, 'unvan', _.get(data, 'unvan', null));
        _.set(redraft.form, 'telefon', _.get(data, 'telefon', null));
        _.set(redraft.form, 'cepTel', _.get(data, 'cepTel', null));
        _.set(redraft.form, 'rol.id', _.get(data, 'rol.id', null));
        _.set(redraft.form, 'kurulus.id', _.get(data, 'kurulus.id', null));
        _.set(redraft.form, 'aktifPasif.id', _.get(data, 'aktifPasif.id', null));
        return redraft;
      }),
      () => validate(Object.keys(this.state.validation), () => this.props.onChange(this.state.form, this.state.isFormValid)),
    );
  };

  handleOnFormChange = (_e, { name, value }) => {
    const { validate } = this;

    this.setState(
      produce(draft => {
        const redraft = draft;
        _.set(redraft.form, name, value);
        return redraft;
      }),
      () => validate([name], () => this.props.onChange(this.state.form, this.state.isFormValid)),
    );
  };

  validate = (names, callback) => {
    this.setState(
      produce(draft => {
        const redraft = draft;
        const { form } = redraft;
        names.forEach(name => {
          if (name === 'adSoyad') {
            if (form.adSoyad === null || form.adSoyad.trim().length === 0) {
              _.set(redraft.validation, name, nonValidState('Lütfen geçerli bir ad soyad bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
          if (name === 'eposta') {
            if (form.eposta === null || form.eposta.trim().length === 0) {
              _.set(redraft.validation, name, nonValidState('Lütfen eposta bilgisi giriniz.'));
            } else if (!emailRegex.test(form.eposta.toLowerCase())) {
              _.set(redraft.validation, name, nonValidState('Lütfen geçerli bir eposta bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
          
          if (name === 'rol.id') {
            if (form.rol === null) {
              _.set(redraft.validation, name, nonValidState('Lütfen rol bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }

          if (name === 'kurulus.id') {
            if (form.kurulus === null) {
              _.set(redraft.validation, name, nonValidState('Lütfen kuruluş bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
          
          if (name === 'aktifPasif.id') {
            if (form.aktifPasif === null) {
              _.set(redraft.validation, name, nonValidState('Lütfen aktif pasif bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
        });
      }),
      () => {
        const isValid = Object.entries(this.state.validation).every(entry => entry[1].isValid === true);

        return this.setState(
          produce(draft => {
            const redraft = draft;
            redraft.isFormValid = isValid;
            return redraft;
          }),
          () => callback(),
        );
      },
    );
  };

  render() {
    const { handleOnFormChange } = this;
    const { form, validation } = this.state;
    const { kurulusList } = this.props.resources;

    return (
      <Form>
        <Form.Group>
          <Form.Field width="8" error={validation.adSoyad.touched && !validation.adSoyad.isValid}>
            <Form.Input
              label="Ad Soyad"
              placeholder="Ad Soyad giriniz"
              name="adSoyad"
              value={_.get(form, 'adSoyad') || ''}
              onChange={handleOnFormChange}
              required
            />
            {validation.adSoyad.touched && !validation.adSoyad.isValid && <Label basic pointing color="red" content={validation.adSoyad.message} />}
          </Form.Field>
          <Form.Field width="8" error={validation.eposta.touched && !validation.eposta.isValid}>
            <Form.Input
              label="EPosta"
              placeholder="EPosta giriniz"
              name="eposta"
              value={_.get(form, 'eposta') || ''}
              onChange={handleOnFormChange}
              required
            />
            {validation.eposta.touched && !validation.eposta.isValid && <Label basic pointing color="red" content={validation.eposta.message} />}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Dropdown
              label="Rol"
              placeholder="Rol giriniz"
              name="rol.id"
              value={_.get(form, 'rol.id')}
              options={[
                { key: 1, text: 'Yönetici', value: 1 },
                { key: 2, text: 'Standart', value: 2 },
              ]}
              onChange={(e, data) => {
                handleOnFormChange(e, data);
              }}
              selection
              fluid
              search
              required
              noResultsMessage={noResultMessage}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Dropdown
              label="Kuruluş"
              placeholder="Kuruluş giriniz"
              name="kurulus.id"
              value={_.get(form, 'kurulus.id')}
              options={kurulusList}
              onChange={(e, data) => {
                handleOnFormChange(e, data);
              }}
              selection
              fluid
              search
              noResultsMessage={noResultMessage}
              required
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width="8" >
            <Form.Input
              label="Birim"
              placeholder="Birim giriniz"
              name="birim"
              value={_.get(form, 'birim') || ''}
              onChange={handleOnFormChange}
            />
          </Form.Field>
          <Form.Field width="8" >
            <Form.Input
              label="Unvan"
              placeholder="Unvan giriniz"
              name="unvan"
              value={_.get(form, 'unvan') || ''}
              onChange={handleOnFormChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width="8" >
            <Form.Input
              label="Numara"
              placeholder="Numara giriniz"
              name="telefon"
              value={_.get(form, 'telefon') || ''}
              onChange={handleOnFormChange}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              label="Cep Numara"
              placeholder="Cep Numara giriniz"
              name="cepTel"
              value={_.get(form, 'cepTel') || ''}
              onChange={handleOnFormChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <Radio
              label="Aktif"
              name="aktifPasif.id"
              value="1"
              checked={_.get(form, 'aktifPasif.id', '') == 1}
              onChange={handleOnFormChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Pasif"
              name="aktifPasif.id"
              value="0"
              checked={_.get(form, 'aktifPasif.id', '') == 0}
              onChange={handleOnFormChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

BankaKullaniciForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  resources: PropTypes.object,
};

BankaKullaniciForm.defaultProps = {
  resources: {
    kurulusList: [],
  },
};


export default BankaKullaniciForm;
