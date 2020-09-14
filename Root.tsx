import 'react-native-gesture-handler'
import React from 'react'

import { UserSessionProvider } from './src/sessionContext'
import App from './src/App'

const Root = () => (
  <UserSessionProvider>
    <App />
  </UserSessionProvider>
)

export default Root
