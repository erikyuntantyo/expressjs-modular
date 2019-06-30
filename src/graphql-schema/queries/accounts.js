'use strict'

import { GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLAccount } from '../types'
import Models from '../../models'

export default {
  account: {
    type: GraphQLAccount,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, { id }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().accounts.get(id)
      } catch (err) {
        throw err
      }
    }
  },
  accounts: {
    type: new GraphQLList(GraphQLAccount),
    resolve: async (rootValue, args, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        const { data } = await Models.getModels().accounts.find()
        return data
      } catch (err) {
        throw err
      }
    }
  }
}
