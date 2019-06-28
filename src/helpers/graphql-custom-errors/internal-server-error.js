'use strict'

import { GraphQLError } from 'graphql'

export default class GraphQLInternalServerError extends GraphQLError {
  constructor(message = 'Internal Server Error') {
    super(message)
    this.statusCode = 500
  }
}
