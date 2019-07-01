'use strict'

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLBank from './banks'
import GraphQLDate from './date'
import Models from '../../models'

export default new GraphQLObjectType({
  name: 'accounts',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    accountNumber: {
      type: new GraphQLNonNull(GraphQLString)
    },
    bank: {
      type: new GraphQLNonNull(GraphQLBank),
      resolve: async ({ bankId }) => await Models.getModels().banks.get(bankId)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    dob: {
      type: new GraphQLNonNull(GraphQLDate)
    },
    address: {
      type: new GraphQLNonNull(GraphQLString)
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLDate
    },
    updatedAt: {
      type: GraphQLDate
    }
  }
})
