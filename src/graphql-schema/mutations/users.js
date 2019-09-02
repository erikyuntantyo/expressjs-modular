'use strict'

import bcrypt from 'bcrypt'
import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import uuidv4 from 'uuidv4'

import CommonHelper from '../../helpers/common'
import { GraphQLMethodNotAllowedError, GraphQLInvalidCredentialError } from '../../helpers/graphql-custom-errors'
import { GraphQLUser, GraphQLUserRoles } from '../types'
import Models from '../../models'

export default {
  createAdmin: {
    type: GraphQLUser,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      },
      role: {
        type: new GraphQLNonNull(GraphQLUserRoles)
      }
    },
    resolve: async (rootValue, data, { headers: { authorization } }) => {
      // NB: add email verification to make sure the user is currently available
      await CommonHelper.verifyAuthToken(authorization)

      data.id = uuidv4()

      const _password = await bcrypt.hash(data.password, 10)

      if (data.role === 'customer') {
        throw new GraphQLMethodNotAllowedError('Cannot create customer using this method. Please use "createCustomer" method instead.')
      }

      return await Models.getModels().users.create({
        ...data, password: _password
      })
    }
  },
  disableUser: {
    type: GraphQLUser,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      disabled: {
        type: GraphQLBoolean
      }
    },
    resolve: async (rootValue, { id, disabled = true }, { headers: { authorization } }) => {
      await CommonHelper.verifyAuthToken(authorization)
      return await Models.getModels().users.update(id, { disabled })
    }
  },
  resetPassword: {
    type: GraphQLUser,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      oldPassword: {
        type: new GraphQLNonNull(GraphQLString)
      },
      newPassword: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (rootValue, { username, oldPassword, newPassword }, { headers: { authorization } }) => {
      // NB: add email verification to make it more secure
      await CommonHelper.verifyAuthToken(authorization)

      const { data: [{ id, password }] } = await Models.getModels().users.find({ where: { username } })

      if (password && await bcrypt.compare(oldPassword, password)) {
        return await Models.getModels().users.update(id, { password: await bcrypt.hash(newPassword) })
      } else {
        throw new GraphQLInvalidCredentialError()
      }
    }
  }
}
