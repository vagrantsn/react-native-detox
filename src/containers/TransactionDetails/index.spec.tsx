import React from 'react'
import {
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native'

import TransactionDetails from './index'

test('Transaction Details - When refunding', async () => {
  const providers = {
    getTransaction: () => Promise.resolve({
      status: 'paid',
      paid_amount: 1000,
      refunded_amount: 0,
    }),
    refundTransaction: () => Promise.resolve({
      status: 'refunded',
      paid_amount: 1000,
      refunded_amount: 1000,
    }),
  }

  const {
    queryByText,
    getByText,
  } = render(
    <TransactionDetails
      providers={providers}
    />
  )

  await waitFor(() => getByText('Refund'))

  const button = getByText('Refund')

  // every action that causes a state update must be called inside act callback
  await act(async () => {
    await fireEvent.press(button)
  })

  expect(queryByText('Refund')).toBeFalsy()
})
