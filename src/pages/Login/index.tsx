import React from 'react'

import LoginContainer from '../../containers/Login'
import loginRequest from './request'

import { useUserSessionDispatch } from '../../sessionContext'

type PropTypes = {
  navigation: any,
}

type SubmitProps = {
  email: string,
  password: string,
}

const LoginPage = ({ navigation }: PropTypes) => {
  const login = useUserSessionDispatch()

  const handleSubmit = (
    { email, password }: SubmitProps
  ) => loginRequest({ email, password })
    .then(({ session_id }) => login(session_id))
    .then(() => navigation.navigate('LoggedArea'))

  return (
    <LoginContainer
      onSubmit={handleSubmit}
    />
  )
}

export default LoginPage
