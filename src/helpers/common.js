'use strict'

import config from 'config'
import jwt from 'jsonwebtoken'

import Models from '../models'

export default class CommonHelper {
  constructor() {}

  static verifyToken(token) {
    try {
      const { userId, exp } = jwt.verify(token, config.auth.secret)
      const { dataValues: user } = Models.getModels().users.get(userId)

      return user && (exp <= Date.now())
    } catch (error) {
      return false
    }
  }
}
