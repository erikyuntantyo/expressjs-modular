'use strict'

import { GraphQLError } from 'graphql'

export default class GraphQLUnauthorizedError extends GraphQLError {
  constructor(message = 'Authentication is needed to get requested response.') {
    super(message)
    this.statusCode = 401
  }
}
