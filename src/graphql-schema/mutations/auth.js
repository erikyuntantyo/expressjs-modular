'use strict'

import bcrypt from 'bcrypt'
import config from 'config'
import { GraphQLError, GraphQLNonNull, GraphQLString } from 'graphql'
import jwt from 'jsonwebtoken'
import uuidv4 from 'uuidv4'

import { GraphQLAuth } from '../types'
import Models from '../../models'
import { GraphQLInternalServerError, GraphQLInvalidCredentialError } from '../../helpers/graphql-custom-errors'

export default {
  authToken: {
    type: GraphQLAuth,
    args: {
      username: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (rootValue, { username, password }) => {
      const { total, data } = await Models.getModels().users.find({
        where: { username }
      })

      if (total > 0) {
        const [{ id, password: _password, type }] = data

        if (await bcrypt.compare(password, _password)) {
          const now = Date.now()
          const exp = now + (3600 * 1000)
          const resetKey = await bcrypt.hash(`${username}:${_password}`, 10)
          const token = jwt.sign({
            userId: id,
            type: type,
            iat: now,
            exp,
            iss: 'expressjs',
            sub: 'graphql',
            jwtid: uuidv4()
          }, config.auth.secret)

          return { token, resetKey }
        }
      }

      throw new GraphQLInvalidCredentialError()
    }
  },
  resetToken: {
    type: GraphQLAuth,
    args: {
      resetKey: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (rootValue, { resetKey }, { headers: { authorization } }) => {
      try {
        const { userId } = jwt.verify(authorization, config.auth.secret)
        const { id, username, password, type } = Models.getModels().users.get(userId)

        if (await bcrypt.compare(`${username}:${password}`, resetKey)) {
          const now = Date.now()
          const exp = now + (3600 * 1000)
          const resetKey = await bcrypt.hash(`${username}:${password}`, 10)
          const token = jwt.sign({
            userId: id,
            type: type,
            iat: now,
            exp,
            iss: 'expressjs',
            sub: 'graphql',
            jwtid: uuidv4()
          }, config.auth.secret)

          return { token, resetKey }
        }

        throw new GraphQLInvalidCredentialError('Invalid reset key.')
      } catch (error) {
        if (error instanceof GraphQLError) {
          throw error
        }

        throw new GraphQLInternalServerError(error)
      }
    }
  }
}
