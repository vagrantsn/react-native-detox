import React, { useEffect, useState } from 'react'
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

type InfoPropTypes = {
  label: string,
  value: string | number,
}

const Info = ({ label, value } : InfoPropTypes) => (
  <View style={styles.info}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

type PropTypes = {
  providers: {
    getTransaction: Function,
    refundTransaction: Function,
  }
}

type State = {
  status: string,
  paid_amount: number,
  refunded_amount: number,
}

const TransactionDetails = ({ providers } : PropTypes) => {
  const initialState : State = {
    status: '',
    paid_amount: 0,
    refunded_amount: 0,
  }

  const [transaction, setTransaction] = useState(initialState)

  useEffect(() => {
    providers.getTransaction().then(setTransaction)
  }, [])

  const handleRefund = () => {
    providers.refundTransaction().then(setTransaction)
  }

  return (
    <View style={styles.container}>
      <Info label="Status" value={transaction.status} />
      <Info label="Paid Amount" value={transaction.paid_amount} />
      <Info label="Refunded Amount" value={transaction.refunded_amount} />
      {transaction.status === 'paid' && (
        <Button
          testID="refundButton"
          title="Refund"
          onPress={handleRefund}
        />
      )}
    </View>
  )
}

export default TransactionDetails
