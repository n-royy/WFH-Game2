import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Image, Form } from 'react-bootstrap';
import LandingPicture from '../images/back-ground.jpg';
import { register, login } from '../action/auth';

const Register = ({ show, onHide, register, isAuthenticated, login, auth }) => {
  const [formData, setformData] = useState({
    account: '',
    unit: '',
  });
  const [checked, setChecked] = useState(false);
  const { account, unit } = formData;
  const onChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onRegister = async (e) => {
    e.preventDefault();

    if (account === '' || unit === '') {
      setformData({ ...formData });
    } else {
      setformData({ ...formData });
      register(account, unit);
    }
  };
  const onLogin = async (e) => {
    e.preventDefault();

    login(account);
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        <Image src={LandingPicture} fluid style={{ marginBottom: '10px' }} />
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control
              type='text'
              placeholder='Account'
              name='account'
              value={account}
              onChange={(e) => {
                onChange(e);
              }}
            />
            {checked && (
              <Form.Text className='text-muted'>
                {`Using Fsoft's account (ex: NamNN10)`}
              </Form.Text>
            )}
          </Form.Group>

          {checked && (
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                type='text'
                placeholder='BU'
                name='unit'
                value={unit}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </Form.Group>
          )}
          <Form.Text className='text-muted'>
            <Form.Check
              type={'checkbox'}
              label={`Haven't an Account Already?`}
              checked={checked}
              onClick={() => setChecked(!checked)}
            />
          </Form.Text>
        </Form>
        <div
          className='footer'
          style={{ textAlign: 'center', marginTop: '10px' }}
        >
          {checked ? (
            <Button
              disabled={account !== '' && unit !== '' ? false : true}
              variant={
                account !== '' && unit !== '' ? 'outline-info' : 'secondary'
              }
              onClick={(e) => onRegister(e)}
            >
              {`Register & Play`}
            </Button>
          ) : (
            <Button
              disabled={account !== '' ? false : true}
              variant={account !== '' ? 'outline-info' : 'secondary'}
              onClick={(e) => onLogin(e)}
            >
              Login
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps, { register, login })(Register);
