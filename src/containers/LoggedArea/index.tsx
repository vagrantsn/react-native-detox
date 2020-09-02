import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
})

const LoggedArea = () => (
  <View style={styles.container}>
    <Text>Welcome to LoggedArea</Text>
  </View>
)

export default LoggedArea
