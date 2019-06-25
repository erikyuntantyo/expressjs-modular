'use strict'

import config from 'config'
import requestPromise from 'request-promise'

import App from '../src/app'

let server

describe('Testing application with Jest', () => {
  beforeAll(done => {
    server = App.initialize(config.server.port)
    server.once('listening', () => done())
  })

  afterAll(done => {
    server.close(done)
  })

  it('test the service is running', async () => {
    const response = await requestPromise({
      method: 'GET',
      uri: 'http://localhost:3030/test',
      resolveWithFullResponse: true
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).not.toBeUndefined()
  })

  it('test the 404 error', async () => {
    try {
      const response = await requestPromise({
        method: 'GET',
        uri: 'http://localhost:3030',
        resolveWithFullResponse: true
      })

      expect(response.statusCode).toBe(404)
    } catch (err) {
      expect(err.statusCode).toBe(404)
    }
  })
})
