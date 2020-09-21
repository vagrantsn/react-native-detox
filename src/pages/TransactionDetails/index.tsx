import React from 'react'

import TransactionDetailsContainer from '../../containers/TransactionDetails'

import client from '../../utils/client'

type PropTypes = {
  route: {
    params: {
      id: number,
    },
  },
}

const TransactionDetails = ({
  route,
} : PropTypes) => {
  const transactionId = route.params.id

  const providers = {
    getTransaction: () => client.transactions.findOne(transactionId),
    refundTransaction: () => client.transactions.refund(transactionId),
  }

  return (
    <TransactionDetailsContainer
      providers={providers}
    />
  )
}

export default TransactionDetails
