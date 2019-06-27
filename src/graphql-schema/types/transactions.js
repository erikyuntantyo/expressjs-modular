'use strict'

import { GraphQLFloat, GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLAccount from './accounts'
import Models from '../../models'

export default new GraphQLObjectType({
  name: 'transactions',
  fields: {
    id: {
      type: GraphQLID
    },
    user: {
      type: GraphQLAccount,
      resolve: async (parent) => {
        const { dataValues } = await Models.getModels().accounts.get(parent.accountId)
        return dataValues
      }
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
    balance: {
      type: GraphQLFloat
    }
  }
})
