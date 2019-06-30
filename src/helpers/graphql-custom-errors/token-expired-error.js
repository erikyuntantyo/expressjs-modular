'use strict'

import { GraphQLError } from 'graphql'

export default class GraphQLTokenExpiredError extends GraphQLError {
  constructor(message = 'The authentication token has expired.') {
    super(message)
    this.statusCode = 401
  }
}
