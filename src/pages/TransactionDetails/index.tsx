import React, { useEffect, useState } from 'react'

import TransactionDetailsContainer from '../../containers/TransactionDetails'
import buildRequest from '../../utils/buildRequest'
import { useUserSession } from '../../sessionContext'

const getTransaction = (sessionId: string, id: number) => buildRequest({
  method: 'GET',
  path: `/transactions/${id}?session_id=${sessionId}`,
})

const refundTransaction = (sessionId: string, id: number) => buildRequest({
  method: 'POST',
  path: `/transactions/${id}/refund?session_id=${sessionId}`,
})

const TransactionDetails = ({
  route,
}) => {
  const sessionId = useUserSession()
  const [transaction, setTransaction] = useState({})
  const transactionId = route.params.id

  useEffect(() => {
    getTransaction(sessionId, transactionId)
      .then(setTransaction)
  }, [])

  const handleRefund = () => {
    refundTransaction(sessionId, transactionId).then(setTransaction)
  }

  return (
    <TransactionDetailsContainer
      transaction={transaction}
      onRefund={handleRefund}
    />
  )
}

export default TransactionDetails
