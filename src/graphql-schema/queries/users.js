'use strict'

import { GraphQLID, GraphQLNonNull } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLUser, GraphQLUsersList } from '../types'
import Models from '../../models'

export default {
  user: {
    type: GraphQLUser,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, { id }, { headers: { authorization } }) => {
      await CommonHelper.verifyAuthToken(authorization)
      return await Models.getModels().users.get(id)
    }
  },
  users: {
    type: GraphQLUsersList,
    resolve: async (rootValue, args, { headers: { authorization } }) => {
      await CommonHelper.verifyAuthToken(authorization)
      return await Models.getModels().users.find()
    }
  }
}
