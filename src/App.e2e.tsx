import React from 'react'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LaunchArguments } from 'react-native-launch-arguments'

import LoginPage from './pages/Login'
import LoggedArea from './pages/LoggedArea'
import Transactions from './pages/Transactions'
import TransactionDetails from './pages/TransactionDetails'
import {
  useUserSessionDispatch,
} from './sessionContext'

const Stack = createStackNavigator()

const App = () => {
  const setSessionId = useUserSessionDispatch()

  const linking = {
    prefixes: ['e2e://'],
    config: {
      screens: {
        LoggedArea: 'LoggedArea',
        Transactions: 'Transactions',
        TransactionDetails: 'TransactionDetails',
      },
    },
  }

  const { sessionId } = LaunchArguments.value()

  if (sessionId) {
    setSessionId(sessionId)
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
        />
        <Stack.Screen
          name="LoggedArea"
          component={LoggedArea}
        />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

export default App
