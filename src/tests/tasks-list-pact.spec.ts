import { describe, it, expect } from 'vitest'
import { MatchersV3, PactV3 } from '@pact-foundation/pact'
import path from 'path'
import ListTaskService from '@/services/ListTask.service'

const provider = new PactV3({
  consumer: 'TaskListConsumer',
  provider: 'TaskListProvider',
  dir: path.resolve(process.cwd(), 'pacts'),
})

describe('GET /todo', () => {
  it('should receive the list of tasks', async () => {
    provider
      .given('there is a list of tasks')
      .uponReceiving('a get request to the list endpoint')
      .withRequest({
        method: 'GET',
        path: '/todo',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { data: MatchersV3.eachLike({ ID: 1, title: 'title' }) },
      })

    return provider.executeTest(async (mockServer) => {
      const response = await ListTaskService(mockServer.url + '/todo')
      expect(response[0]).to.deep.eq({ ID: 1, title: 'title' })
    })
  })
})
