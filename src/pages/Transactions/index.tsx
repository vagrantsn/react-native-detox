import React, { useEffect, useState } from 'react'

import TransactionsContainer from '../../containers/Transactions'

import client from '../../utils/client'

const TransactionsPage = ({ navigation }) => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    client.transactions.findAll().then(setTransactions)
  }, [])

  const handleItemPress = (transactionId) => {
    navigation.push('TransactionDetails', {
      id: transactionId,
    })
  }

  return (
    <TransactionsContainer
      onItemPress={handleItemPress}
      transactions={transactions}
    />
  )
}

export default TransactionsPage
