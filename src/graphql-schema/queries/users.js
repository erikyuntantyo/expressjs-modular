'use strict'

import { GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLUser } from '../types'
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
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().users.get(id)
      } catch (err) {
        throw err
      }
    }
  },
  users: {
    type: new GraphQLList(GraphQLUser),
    resolve: async (rootValue, args, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        const { data } = await Models.getModels().users.find()
        return data
      } catch (err) {
        throw err
      }
    }
  }
}
