'use strict'

import { GraphQLID, GraphQLList } from 'graphql'

import { GraphQLBank } from '../types'
import Models from '../../models'

export default {
  bank: {
    type: GraphQLBank,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: async (rootValue, { id }) => {
      const { dataValues } = await Models.getModels().banks.get(id)
      return dataValues
    }
  },
  banks: {
    type: GraphQLList(GraphQLBank),
    resolve: async () => {
      const { rows } = await Models.getModels().banks.find()
      return rows.map(r => r.dataValues)
    }
  }
}
