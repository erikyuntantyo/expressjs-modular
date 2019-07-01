'use strict'

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLAccount from './accounts'
import GraphQLDate from './date'
import GraphQLUserRole from './user-roles'
import Models from '../../models'

export default new GraphQLObjectType({
  name: 'users',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    type: {
      type: new GraphQLNonNull(GraphQLUserRole)
    },
    account: {
      type: GraphQLAccount,
      resolve: async ({ accountId }) => await Models.getModels().accounts.get(accountId)
    },
    createdAt: {
      type: GraphQLDate
    },
    updatedAt: {
      type: GraphQLDate
    }
  }
})
