/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import _ from 'lodash';
import { defaultValidationState, nonValidState, validState } from 'utils/constants';
import { Form, Radio, Label } from '*****-ui-components';

const noResultMessage = 'Sonuç bulunamadı.';

/* eslint-disable react/prefer-stateless-function */
export class SikayetSablonForm extends React.Component {
  state = {
    form: {
      id: null,
      metin: null,
      altKonu:{
        id: null
      },
      konu:{
        id: null
      },
      tur:{
        id: null
      },
      aktifPasif: {
        id: null,
      },
    },
    validation: {
      metin: defaultValidationState(),
      'altKonu.id': defaultValidationState(),
      'konu.id': defaultValidationState(),
      'tur.id': defaultValidationState(),
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
        _.set(redraft.form, 'metin', _.get(data, 'metin', null));
        _.set(redraft.form, 'altKonu.id', _.get(data, 'altKonu.id', null));
        _.set(redraft.form, 'konu.id', _.get(data, 'konu.id', null));
        _.set(redraft.form, 'tur.id', _.get(data, 'tur.id', null));
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
          if (name === 'metin') {
            if (form.metin === null || form.metin.trim().length === 0) {
              _.set(redraft.validation, name, nonValidState('Lütfen geçerli bir metin bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
          if (name === 'altKonu.id') {
            if (form.altKonu === null) {
              _.set(redraft.validation, name, nonValidState('Lütfen alt konu bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
          if (name === 'konu.id') {
            if (form.konu === null) {
              _.set(redraft.validation, name, nonValidState('Lütfen konu bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
          if (name === 'tur.id') {
            if (form.tur === null) {
              _.set(redraft.validation, name, nonValidState('Lütfen tür bilgisi giriniz.'));
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
    const { altKonular } = this.props.resources;
    const { konular } = this.props.resources;
    const { turler } = this.props.resources;
    
    return (
      <Form>
        <Form.Group>
          <Form.Field width="16" error={validation.metin.touched && !validation.metin.isValid}>
            <Form.TextArea 
              label="Şablon Metin" 
              name="metin"  
              placeholder="Metin giriniz" 
              value={_.get(form, 'metin') || ''} 
              onChange={handleOnFormChange} 
              rows="5"  />
            {validation.metin.touched && !validation.metin.isValid && <Label basic pointing color="red" content={validation.metin.message} />}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Dropdown
              label="Alt Konu"
              placeholder = "Alt konu giriniz."
              name="altKonu.id"
              value={_.get(form, 'altKonu.id')}
              options={altKonular}
              onChange={(e, data) => {
                handleOnFormChange(e, data);
              }}
              selection
              fluid
              search
              noResultsMessage={noResultMessage}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Dropdown
              label="Konu"
              name="konu.id"
              placeholder = "Konu giriniz."
              value={_.get(form, 'konu.id')}
              options={konular}
              onChange={(e, data) => {
                handleOnFormChange(e, data);
              }}
              selection
              fluid
              search
              noResultsMessage={noResultMessage}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Dropdown
              label="Şikayet Tür"
              name="tur.id"
              placeholder = "Tür giriniz."
              value={_.get(form, 'tur.id')}
              options={turler}
              onChange={(e, data) => {
                handleOnFormChange(e, data);
              }}
              selection
              fluid
              search
              noResultsMessage={noResultMessage}
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

SikayetSablonForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  resources: PropTypes.object,
};

SikayetSablonForm.defaultProps = {
  resources: {
    altKonular: [],
    konular: [],
    turler: [],
  },
};

export default SikayetSablonForm;
