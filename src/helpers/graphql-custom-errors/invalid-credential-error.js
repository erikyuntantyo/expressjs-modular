'use strict'

import { GraphQLError } from 'graphql'

export default class GraphQLInvalidCredentialError extends GraphQLError {
  constructor(message = 'Invalid username or password.') {
    super(message)
    this.statusCode = 401
  }
}
