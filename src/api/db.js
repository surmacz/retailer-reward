import { factory, oneOf, primaryKey } from '@mswjs/data'

const db = factory({
  client: {
    id: primaryKey(Number),
    name: String,
  },
  purchase: {
    id: primaryKey(Number),
    value: Number,
    date: String,
    client: oneOf('client'),
  },
})

const clients = [
  { id: 1, name: 'Jon Snow' },
  { id: 2, name: 'Darth Vader' },
  { id: 3, name: 'Frodo Baggins' },
  { id: 4, name: 'Indiana Jones' },
  { id: 5, name: 'Luke Skywalker' },
].map((client) => db.client.create(client))

;[
  { id: 1, value: 120, date: '2023-01-01', client: clients[0] },
  { id: 2, value: 100, date: '2023-02-01', client: clients[0] },
  { id: 3, value: 55.32, date: '2023-02-01', client: clients[1] },
  { id: 4, value: 155.32, date: '2023-02-10', client: clients[1] },
  { id: 5, value: 523.99, date: '2023-03-10', client: clients[2] },
  { id: 6, value: 140, date: '2023-03-20', client: clients[2] },
  { id: 7, value: 100.88, date: '2023-04-01', client: clients[2] },
  { id: 8, value: 120, date: '2023-04-02', client: clients[2] },
  { id: 9, value: 140, date: '2022-04-02', client: clients[2] },
].map((purchase) => db.purchase.create(purchase))

export { db }
