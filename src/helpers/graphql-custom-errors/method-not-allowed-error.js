'use strict'

import { GraphQLError } from 'graphql'

export default class GraphQLMethodNotAllowedError extends GraphQLError {
  constructor(message = 'Method not allowed.') {
    super(message)
    this.statusCode = 405
  }
}
