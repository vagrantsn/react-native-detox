import React from 'react'

import LoginContainer from '../../containers/Login'

import loginRequest from './request'

interface PropTypes {
  navigation: any,
}

interface SubmitProps {
  email: string,
  password: string,
}

const LoginPage = ({ navigation }: PropTypes) => {

  const handleSubmit = (
    { email, password }: SubmitProps
  ) => loginRequest({ email, password }).then(() => (
    navigation.navigate('LoggedArea')
  ))

  return (
    <LoginContainer
      onSubmit={handleSubmit}
    />
  )
}

export default LoginPage
