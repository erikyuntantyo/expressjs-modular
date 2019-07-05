'use strict'

import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql'
import GraphQLAccount from './accounts'

export default new GraphQLObjectType({
  name: 'accountsList',
  fields: {
    total: {
      type: GraphQLInt
    },
    data: {
      type: new GraphQLList(GraphQLAccount)
    }
  }
})
