require('dotenv').config()

import buildRequest from '../../../utils/buildRequest'

const apiKey = process.env.E2E_API_KEY

const createTransaction = () => buildRequest({
  method: 'POST',
  path: '/transactions',
  body: {
    api_key: apiKey,
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

describe('Transactions List', () => {
  it('should not show the refunded transaction on the list', async () => {
    const transaction = await createTransaction()

    await sleep(5000) // wait for ElasticSearch

    await device.launchApp({
      newInstance: true,
      url: 'e2e://Transactions',
      launchArgs: { apiKey },
    })

    await element(by.id(transaction.id.toString())).tap()

    await element(by.text('REFUND')).tap()

    await device.pressBack()

    await sleep(5000) // wait for ElasticSearch

    await element(by.id('flatList')).swipe('down', 'fast', 0.5)

    await expect(element(by.id(transaction.id.toString()))).toBeNotVisible()
  })
})
