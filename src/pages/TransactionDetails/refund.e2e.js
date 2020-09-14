require('dotenv').config()

import buildRequest from '../../utils/buildRequest'

const login = () => buildRequest({
  method: 'POST',
  path: '/sessions',
  body: {
    email: process.env.E2E_PAGARME_EMAIL,
    password: process.env.E2E_PAGARME_PASSWORD,
  },
})

const createTransaction = sessionId => buildRequest({
  method: 'POST',
  path: '/transactions',
  body: {
    session_id: sessionId,
    amount: 1000,
    card_number: '4242424242424242',
    card_holder_name: 'JOHN DOVE',
    card_expiration_date: '0722',
    card_cvv: '123',
    installments: 1,
    customer: {
      name: 'Customer Teste',
      email: 'customer@email.com',
      document_number: '489.712.640-12',
      address: {
        zipcode: '06320100',
        neighborhood: 'Centro',
        street_number: '17',
        street: 'R Atilio Tolaine',
      },
      phone: { ddd: '11', number: '99999999' },
    },
  },
})

describe('Transaction details', () => {
  beforeAll(async () => {
    const { session_id: sessionId } = await login()

    const { id: transactionId } = await createTransaction(sessionId)

    await device.launchApp({
      newInstance: true,
      url: `e2e://TransactionDetails?id=${transactionId}`,
      launchArgs: { sessionId }
    })
  })

  it('should show a transaction with paid status', async () => {
    await expect(element(by.text('paid'))).toBeVisible()
  })

  it('should refund a transaction successfully', async () => {
    await element(by.id('refundButton')).tap()

    await expect(element(by.text('refunded'))).toBeVisible()
    await expect(element(by.id('refundButton'))).toBeNotVisible()
  })
})
