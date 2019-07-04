'use strict'

import { GraphQLFloat, GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLDate from './date'
import GraphQLUser from './users'
import Models from '../../models'

export default new GraphQLObjectType({
  name: 'transactions',
  fields: {
    id: {
      type: GraphQLID
    },
    user: {
      type: GraphQLUser,
      resolve: async ({ userId }) => await Models.getModels().users.get(userId)
    },
    type: {
      type: GraphQLString
    },
    amount: {
      type: GraphQLFloat
    },
    description: {
      type: GraphQLString
    },
    remarks: {
      type: GraphQLString
    },
    balance: {
      type: GraphQLFloat
    },
    createdAt: {
      type: GraphQLDate
    },
    updatedAt: {
      type: GraphQLDate
    }
  }
})
