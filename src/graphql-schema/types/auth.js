'use strict'

import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
  name: 'auth',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    resetKey: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})
