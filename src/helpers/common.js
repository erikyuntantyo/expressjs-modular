'use strict'

import config from 'config'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'

import {
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
      if (error instanceof GraphQLError) {
        throw error
      }

      throw new GraphQLInvalidCredentialError(error.message || error)
    }
  }
}
