'use strict'

import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql'
import GraphQLTransaction from './transactions'

export default new GraphQLObjectType({
  name: 'transactionsList',
  fields: {
    total: {
      type: GraphQLInt
    },
    data: {
      type: new GraphQLList(GraphQLTransaction)
    }
  }
})
