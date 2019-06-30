'use strict'

import config from 'config'
import jwt from 'jsonwebtoken'

import {
  GraphQLInternalServerError,
  GraphQLInvalidCredentialError,
  GraphQLTokenExpiredError,
  GraphQLUnauthorizedError
} from '../helpers/graphql-custom-errors'
import Models from '../models'

export default class CommonHelper {
  constructor() { }

  static async verifyAuthToken(token) {
    try {
      if (!token) {
        throw new GraphQLUnauthorizedError()
      }

      const { userId, exp } = jwt.verify(token, config.auth.secret)
      const user = await Models.getModels().users.get(userId)

      if (user && (exp <= Date.now())) {
        throw new GraphQLTokenExpiredError()
      } else if (!user) {
        throw new GraphQLInvalidCredentialError()
      }
    } catch (error) {
      throw new GraphQLInternalServerError(error.message || error)
    }
  }
}
