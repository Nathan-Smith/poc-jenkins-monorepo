import { createMocks } from 'node-mocks-http'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import calculate from '../calculate'
import { NextApiRequest, NextApiResponse } from 'next'

const server = setupServer(
  rest.post('http://math-service/add', (req, res, ctx) => {
    return res(ctx.json('6'))
  })
)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('calculate', () => {
  test('a', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
    })

    await calculate(req, res)

    expect(res._getData()).toBe('"6"')
  })
})
