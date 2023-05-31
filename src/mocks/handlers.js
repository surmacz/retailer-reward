import { rest } from 'msw'

const clients = [
  {
    id: 1,
    name: 'Jon Snow',
  },
  {
    id: 2,
    name: 'Darth Vader',
  },
  {
    id: 3,
    name: 'Frodo Baggins',
  },
  {
    id: 4,
    name: 'Indiana Jones',
  },
  {
    id: 5,
    name: 'Luke Skywalker',
  },
]

const purchases = [
  {id: 1, clientId: 1, value: 120, date: '2023-01-01'},
  {id: 2, clientId: 1, value: 100, date: '2023-02-01'},
  {id: 3, clientId: 2, value: 55.32, date: '2023-02-01'},
  {id: 4, clientId: 2, value: 155.32, date: '2023-02-10'},
  {id: 5, clientId: 3, value: 523.99, date: '2023-03-10'},
]


export const handlers = [
  rest.get('/purchases', (req, res, ctx) => {
    const clientsObj = clients.reduce((acc, client) => ({...acc, [client.id]: client}), {})
    return res(
      ctx.delay(500), //to simulate latency
      ctx.json(purchases.map(purchase => ({
        ...purchase,
        ...Object.keys(clientsObj[purchase.clientId]).reduce((acc, clientKey) => ({...acc, ['client'+clientKey[0].toUpperCase()+clientKey.substring(1)]: clientsObj[purchase.clientId][clientKey]}), {})
      })))
    )
  }),

  rest.get('/purchases/client/:clientId', (req, res, ctx) => {
    const { clientId } = req.params

    const client = clients.find(client => client.id === +clientId)
    if (!client) {
      return res(ctx.status(400))
    }

    return res(
      ctx.delay(500), //to simulate latency
      ctx.json(purchases.filter(purchase => purchase.clientId === +clientId).map(purchase => ({
        ...purchase,
        ...Object.keys(client).reduce((acc, clientKey) => ({...acc, ['client'+clientKey[0].toUpperCase()+clientKey.substring(1)]: client[clientKey]}), {})
      })))
    )
  }),
]
