import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './pages/Login'
import LoggedArea from './pages/LoggedArea'
import Transactions from './pages/Transactions'
import TransactionDetails from './pages/TransactionDetails'

const Stack = createStackNavigator()

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
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

export default App
