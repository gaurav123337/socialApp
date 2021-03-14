import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import {AuthContext} from '../context/auth'

import {useForm} from '../util/hooks';

const Login = (props) => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const {onSubmit, onChange, values} = useForm(loginUserCallback, {
    username: '',
    password: ''
  })

  const [loginUser, {loading} ] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}){
      context.login(userData);
      props.history.push('/');
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function loginUserCallback(event){
    loginUser();
  }


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
      <h1>Login</h1>
      <Form.Input label='Username' placeholder='Username...' name='username' value={values.username}
      type="text"
      error={errors.username ? true : false}
      onChange={onChange}/>

      <Form.Input label='Password' placeholder='Password...' name='password' value={values.password}
      type="password"
      error={errors.password ? true : false}
      onChange={onChange}/>
      <Button type="submit" primary>
        Login
      </Button>
      </Form>
      {
        Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((val) => {
                return (<li key={val}>
                  {val}
                </li>)
              })}
            </ul>
          </div>
        )
      }

    </div>
  );
};

Login.propTypes = {};

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ){
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Login;
