'use strict'

import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

import GraphQLAccount from './accounts'
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
    type: {
      type: GraphQLString
    },
    account: {
      type: GraphQLAccount,
      resolve: async (parent) => {
        const { dataValues } = await Models.getModels().accounts.get(parent.accountId)
        return dataValues
      }
    }
  }
})
