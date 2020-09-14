import React, { useEffect, useState } from 'react'

import TransactionsContainer from '../../containers/Transactions'
import buildRequest from '../../utils/buildRequest'
import { useUserSession } from '../../sessionContext'

const getTransactions = sessionId => buildRequest({
  method: 'GET',
  path: '/transactions',
  params: { session_id: sessionId },
})

const TransactionsPage = ({ navigation }) => {
  const sessionId = useUserSession()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions(sessionId)
      .then(setTransactions)
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
