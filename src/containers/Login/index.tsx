import React from 'react'
import {
  Button,
  TextInput,
  View,
} from 'react-native'
import { Formik } from 'formik'

interface PropTypes {
  onSubmit: any
}

const LoginContainer = ({
  onSubmit
}: PropTypes) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    onSubmit={onSubmit}
  >
    {({ handleChange, handleSubmit, values }) => (
      <View>
        <TextInput
          testID="email"
          onChangeText={handleChange('email')}
          placeholder="Email"
          value={values.email}
        />
        <TextInput
          testID="password"
          onChangeText={handleChange('password')}
          placeholder="Password"
          secureTextEntry
          value={values.password}
        />
        <Button
          testID="login"
          onPress={handleSubmit}
          title="Login"
        />
      </View>
    )}
  </Formik>
)

export default LoginContainer
