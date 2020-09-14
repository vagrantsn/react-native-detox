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
  },
  info: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    flexDirection: 'column',
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
  },
  value: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

const Info = ({ label, value }) => (
  <View style={styles.info}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

const TransactionDetails = ({
  transaction,
  onRefund,
}) => (
  <View style={styles.container}>
    <Info label="Status" value={transaction.status} />
    <Info label="Paid Amount" value={transaction.paid_amount} />
    <Info label="Refunded Amount" value={transaction.refunded_amount} />
    { transaction.status === 'paid' && (
      <Button
        testID="refundButton"
        title="Refund"
        onPress={onRefund}
      />
    )}
  </View>
)

export default TransactionDetails
