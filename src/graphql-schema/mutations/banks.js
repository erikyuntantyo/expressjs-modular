'use strict'

import { GraphQLID, GraphQLString } from 'graphql'
import uuidv4 from 'uuidv4'

import { GraphQLBank } from '../types'
import Models from '../../models'

export default {
  createBank: {
    type: GraphQLBank,
    args: {
      name: {
        type: GraphQLString
      },
      code: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, data) => {
      data.id = uuidv4()

      const { dataValues } = await Models.getModels().banks.create(data)

      return dataValues
    }
  },
  updateBank: {
    type: GraphQLBank,
    args: {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      code: {
        type: GraphQLString
      }
    },
    resolve: async () => { }
  }
}
