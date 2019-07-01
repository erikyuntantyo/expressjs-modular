'use strict'

import bcrypt from 'bcrypt'
import { GraphQLID, GraphQLString } from 'graphql'
import uuidv4 from 'uuidv4'

import CommonHelper from '../../helpers/common'
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
      data.password = await bcrypt.hash(data.password, 10)

      return await Models.getModels().users.create(data)
    }
  },
  // disableUser: {},
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
    resolve: async (rootValue, { id, username, password, type }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().users.update(id, {
          username,
          password: await bcrypt.hash(password, 10),
          type
        })
      } catch (err) {
        throw err
      }
    }
  }
}
