'use strict'

import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql'
import GraphQLUser from './users'

export default new GraphQLObjectType({
  name: 'usersList',
  fields: {
    total: {
      type: GraphQLInt
    },
    data: {
      type: new GraphQLList(GraphQLUser)
    }
  }
})
