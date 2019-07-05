'use strict'

import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLAccount from './accounts'
import GraphQLDate from './date'
import Models from '../../models'

export default new GraphQLObjectType({
  name: 'users',
  fields: {
    id: {
      type: GraphQLID
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    role: {
      type: GraphQLString
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
