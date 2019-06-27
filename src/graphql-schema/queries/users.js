'use strict'

import { GraphQLID, GraphQLList } from 'graphql'

import { GraphQLUser } from '../types'
import Models from '../../models'

export default {
  user: {
    type: GraphQLUser,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: async (rootValue, { id }) => {
      const { dataValues } = await Models.getModels().users.get(id)
      return dataValues
    }
  },
  users: {
    type: GraphQLList(GraphQLUser),
    resolve: async () => {
      const { rows } = await Models.getModels().users.find()
      return rows.map(r => r.dataValues)
    }
  }
}
