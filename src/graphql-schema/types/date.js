'use strict'

import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default new GraphQLScalarType({
  name: 'Date',
  serialize: value => value.getTime(),
  parseValue: value => new Date(value),
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }

    return null
  }
})
