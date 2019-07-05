'use strict'

import { GraphQLID, GraphQLNonNull } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLBank, GraphQLBanksList } from '../types'
import Models from '../../models'

export default {
  bank: {
    type: GraphQLBank,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, { id }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().banks.get(id)
      } catch (err) {
        throw err
      }
    }
  },
  banks: {
    type: GraphQLBanksList,
    resolve: async (rootValue, args, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().banks.find()
      } catch (err) {
        throw err
      }
    }
  }
}
