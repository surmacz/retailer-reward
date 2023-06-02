import { rest } from 'msw'
import { db } from './db'

export const handlers = [
  rest.get('/purchases', (req, res, ctx) => {
    return res(
      ctx.delay(500), //to simulate latency
      ctx.json(db.purchase.findMany({ orderBy: { date: 'asc' } }))
    )
  }),

  rest.get('/purchases/client/:clientId', (req, res, ctx) => {
    const { clientId } = req.params

    if (!db.client.findFirst({ where: { id: { equals: +clientId } } })) {
      return res(ctx.status(400))
    }

    return res(
      ctx.delay(500), //to simulate latency
      ctx.json(
        db.purchase.findMany({
          where: { client: { id: { equals: +clientId } } },
        })
      )
    )
  }),
]
