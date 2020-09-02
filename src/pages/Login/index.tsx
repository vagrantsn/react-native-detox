import React from 'react'

import LoginContainer from '../../containers/Login'

const loginRequest = (data: object) => (
  fetch('https://api.pagar.me/1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(async (res) => {
      const parsed = await res.json()
      if (!res.ok) {
        throw parsed
      }

      return parsed
    })
)

interface PropTypes {
  navigation: any,
}

const LoginPage = ({ navigation }: PropTypes) => {

  const handleSubmit = (
    { email, password }: { email: string, password: string }
  ) => {
    loginRequest({ email, password })
      .then(() => {
        navigation.navigate('LoggedArea')
      })
  }

  return (
    <LoginContainer
      onSubmit={handleSubmit}
    />
  )
}

export default LoginPage
