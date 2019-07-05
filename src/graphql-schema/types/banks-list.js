'use strict'

import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql'
import GraphQLBank from './banks'

export default new GraphQLObjectType({
  name: 'banksList',
  fields: {
    total: {
      type: GraphQLInt
    },
    data: {
      type: new GraphQLList(GraphQLBank)
    }
  }
})
