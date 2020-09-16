import React, { useEffect, useState } from 'react'

import TransactionDetailsContainer from '../../containers/TransactionDetails'

import client from '../../utils/client'

const TransactionDetails = ({
  route,
}) => {
  const [transaction, setTransaction] = useState({})
  const transactionId = route.params.id

  useEffect(() => {
    client.transactions.findOne(transactionId).then(setTransaction)
  }, [])

  const handleRefund = () => {
    client.transactions.refund(transactionId).then(setTransaction)
  }

  return (
    <TransactionDetailsContainer
      transaction={transaction}
      onRefund={handleRefund}
    />
  )
}

export default TransactionDetails
