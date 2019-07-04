'use strict '

import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLDate from './date'

export default new GraphQLObjectType({
  name: 'banks',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    code: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLDate
    },
    updatedAt: {
      type: GraphQLDate
    }
  }
})
