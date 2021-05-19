import React, { useState } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import AuthService from '../services/auth.service';

const required = (value) => {
  if (value) {
    return null;
  }
  return (
    <div className="alert alert-danger" role="alert">
      This field is required!
    </div>
  );
};

const email = (value) => {
  if (isEmail(value)) {
    return null;
  }
  return (
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  );
};

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    successful: false,
    message: '',
  });
  const [checkButton, setCheckButton] = useState(undefined);
  const [form, setForm] = useState(undefined);

  const handleRegister = (e) => {
    e.preventDefault();

    setData({ ...data, message: '', successful: false });

    form.validateAll();

    // eslint-disable-next-line no-underscore-dangle
    if (checkButton.context._errors.length === 0) {
      AuthService.register(
        data.username,
        data.firstName,
        data.lastName,
        data.email,
        data.password
      ).then(
        (response) => {
          setData({
            ...data,
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setData({
            ...data,
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <Form
        onSubmit={handleRegister}
        ref={(c) => {
          setForm(c);
        }}
      >
        {!data.successful && (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <Input
                type="text"
                className="form-control"
                name="firstName"
                value={data.firstName}
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <Input
                type="text"
                className="form-control"
                name="lastName"
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                validations={[required, email]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={data.password || ''}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Register
              </button>
            </div>
          </div>
        )}

        {data.message && (
          <div className="form-group">
            <div
              className={
                data.successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
            >
              {data.message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: 'none' }}
          ref={(c) => {
            setCheckButton(c);
          }}
        />
      </Form>
    </div>
  );
};

export default Register;
