'use strict'

import { GraphQLObjectType, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
  name: 'auth',
  fields: {
    token: {
      type: GraphQLString
    },
    resetKey: {
      type: GraphQLString
    }
  }
})
