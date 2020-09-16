import React, { useEffect, useState } from 'react'

import TransactionsContainer from '../../containers/Transactions'

import client from '../../utils/client'

const TransactionsPage = ({ navigation }) => {
  const [transactions, setTransactions] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = () => {
    setRefreshing(true)

    client.transactions.findAll({ status: 'paid' })
      .then(setTransactions)
      .then(() => setRefreshing(false))
  }

  useEffect(() => {
    fetchData()
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
      onRefresh={fetchData}
      refreshing={refreshing}
    />
  )
}

export default TransactionsPage
