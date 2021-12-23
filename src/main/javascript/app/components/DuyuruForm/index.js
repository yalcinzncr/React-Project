/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import _ from 'lodash';
import { defaultValidationState, nonValidState, validState } from 'utils/constants';
import { Form, Radio, Label } from '*****-ui-components';

/* eslint-disable react/prefer-stateless-function */
export class DuyuruForm extends React.Component {
  state = {
    form: {
      id : null,
      baslik: null,
      icerik: null,
      aktifPasif: {
        id: null,
      },
    },
    validation: {
      baslik: defaultValidationState(),
      icerik: defaultValidationState(),
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
        _.set(redraft.form, 'baslik', _.get(data, 'baslik', null));
        _.set(redraft.form, 'icerik', _.get(data, 'icerik', null));
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
          if (name === 'baslik') {
            if (form.baslik === null || form.baslik.trim().length === 0) {
              _.set(redraft.validation, name, nonValidState('Lütfen geçerli bir başlık bilgisi giriniz.'));
            } else {
              _.set(redraft.validation, name, validState());
            }
          }
          if (name === 'icerik') {
            if (form.icerik === null || form.icerik.trim().length === 0) {
              _.set(redraft.validation, name, nonValidState('Lütfen geçerli bir içerik bilgisi giriniz.'));
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
    return (
      <Form>
        <Form.Group>
          <Form.Field width="16" error={validation.baslik.touched && !validation.baslik.isValid}>
            <Form.Input
              label="Başlık"
              placeholder="Başlık giriniz"
              name="baslik"
              value={_.get(form, 'baslik') || ''}
              onChange={handleOnFormChange}
            />
            {validation.baslik.touched && !validation.baslik.isValid && <Label basic pointing color="red" content={validation.baslik.message} />}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width="16" error={validation.icerik.touched && !validation.icerik.isValid}>
            <Form.TextArea 
             label="İçerik" 
             name="icerik"  
             placeholder="İçerik giriniz" 
             value={_.get(form, 'icerik') || ''} 
             onChange={handleOnFormChange} 
             rows="5"  />
            {validation.icerik.touched && !validation.icerik.isValid && <Label basic pointing color="red" content={validation.icerik.message} />}
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

DuyuruForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  resources: PropTypes.object,
};

export default DuyuruForm;
