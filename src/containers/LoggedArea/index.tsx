import React from 'react'
import {
  Button,
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

type PropTypes = {
  onClick: Function,
}

const LoggedArea = ({ onClick }: PropTypes) => (
  <View style={styles.container}>
    <Button
      title="Welcome to LoggedArea"
      onPress={onClick}
    />
  </View>
)

export default LoggedArea
