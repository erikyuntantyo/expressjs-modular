'use strict'

import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLBank from './banks'
import GraphQLDate from './date'
import Models from '../../models'

export default new GraphQLObjectType({
  name: 'accounts',
  fields: {
    id: {
      type: GraphQLID
    },
    accountNumber: {
      type: GraphQLString
    },
    bank: {
      type: GraphQLBank,
      resolve: async ({ bankId }) => await Models.getModels().banks.get(bankId)
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    dob: {
      type: GraphQLDate
    },
    address: {
      type: GraphQLString
    },
    phone: {
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
