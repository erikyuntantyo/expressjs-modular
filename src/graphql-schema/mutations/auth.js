'use strict'

import bcrypt from 'bcrypt'
import config from 'config'
import { GraphQLString } from 'graphql'
import jwt from 'jsonwebtoken'
import uuidv4 from 'uuidv4'

import { GraphQLAuth } from '../types'
import Models from '../../models'
import { GraphQLInvalidCredentialError } from '../../helpers/graphql-custom-errors'

export default {
  authToken: {
    type: GraphQLAuth,
    args: {
      username: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, { username, password }) => {
      const { total, data } = await Models.getModels().users.find({
        where: { username }
      })

      if (total > 0) {
        const [user] = data

        if (await bcrypt.compare(password, user.password)) {
          const now = Date.now()
          const exp = now + (3600 * 1000)
          const resetKey = await bcrypt.hash(`${username}:${password}`, 10)
          const token = jwt.sign({
            userId: user.id,
            type: user.type,
            iat: now,
            exp,
            iss: 'expressjs',
            sub: 'anonymous',
            jwtid: uuidv4()
          }, config.auth.secret)

          return { token, resetKey }
        }
      }

      throw new GraphQLInvalidCredentialError()
    }
  },
  // resetToken: {}
}
