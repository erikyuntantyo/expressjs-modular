'use strict'

import crypto from 'crypto'
import { GraphQLID, GraphQLString } from 'graphql'
import uuidv4 from 'uuidv4'

import { GraphQLUser } from '../types'
import Models from '../../models'

export default {
  createUser: {
    type: GraphQLUser,
    args: {
      username: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, data) => {
      data.id = uuidv4()

      const { dataValues } = await Models.getModels().users.create(data)

      return dataValues
    }
  },
  updateUser: {
    type: GraphQLUser,
    args: {
      id: {
        type: GraphQLID
      },
      username: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, { id, username, password, type }) => {
      const { dataValues } = await Models.getModels().users.update(id, {
        username,
        password: crypto.createHash('sha256').update(password).digest('base64'),
        type
      })

      return dataValues
    }
  }
}
