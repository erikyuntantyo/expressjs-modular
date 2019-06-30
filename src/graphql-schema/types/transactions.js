'use strict'

import { GraphQLFloat, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLAccount from './accounts'
import Models from '../../models'

export default new GraphQLObjectType({
  name: 'transactions',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    user: {
      type: new GraphQLNonNull(GraphQLAccount),
      resolve: async ({ userId }) => await Models.getModels().users.get(userId)
    },
    type: {
      type: new GraphQLNonNull(GraphQLString)
    },
    amount: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat)
    }
  }
})
