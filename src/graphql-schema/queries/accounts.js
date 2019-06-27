'use strict'

import { GraphQLID, GraphQLList } from 'graphql'

import { GraphQLAccount } from '../types'
import Models from '../../models'

export default {
  account: {
    type: GraphQLAccount,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: async (rootValue, { id }) => {
      const { dataValues } = await Models.getModels().accounts.get(id)
      return dataValues
    }
  },
  accounts: {
    type: GraphQLList(GraphQLAccount),
    resolve: async () => {
      const { rows } = await Models.getModels().accounts.find()
      return rows.map(r => r.dataValues)
    }
  }
}
