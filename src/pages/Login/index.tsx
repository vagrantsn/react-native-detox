import React from 'react'

import LoginContainer from '../../containers/Login'

import client from '../../utils/client'

type PropTypes = {
  navigation: any,
}

type SubmitProps = {
  email: string,
  password: string,
}

const LoginPage = ({ navigation }: PropTypes) => {
  const handleSubmit = (
    { email, password }: SubmitProps
  ) => {
    client.authenticate({ email, password })
      .then(() => navigation.navigate('LoggedArea'))
  }

  return (
    <LoginContainer
      onSubmit={handleSubmit}
    />
  )
}

export default LoginPage
