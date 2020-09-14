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
        neighborhood: 'Centro',
        street_number: '17',
        street: 'R Atilio Tolaine',
        zipcode: '06320100',
      },
      phone: { ddd: '11', number: '99999999' },
    },
  },
})

describe('Transactions list', () => {
  describe('When searching for transaction', () => {
    let transactionId

    beforeAll(async () => {
      const { session_id: sessionId } = await login()

      const { id } = await createTransaction(sessionId)
      transactionId = id.toString()

      // wait for ElasticSearch index
      await new Promise(resolve => setTimeout(resolve, 5000))

      await device.launchApp({
        newInstance: true,
        url: 'e2e://Transactions',
        launchArgs: { sessionId }
      })
    })

    it('should show created transaction on the list', async () => {
      await expect(element(by.text(transactionId))).toBeVisible()
    })
  })
})
