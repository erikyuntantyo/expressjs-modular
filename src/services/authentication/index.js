'use strict'

import config from 'config'
import jwt from 'jsonwebtoken'
import uuidv4 from 'uuidv4'

import ServiceBase from '../../helpers/service-base'
import CustomError from '../../helpers/custom-error'
import hook from './hook'

export default class Service extends ServiceBase {
  constructor(app, models) {
    super('/auth/token', models, hook, {})
  }

  static initialize(app, models) {
    if (!this._service) {
      this._service = new Service(app, models)
    }

    app.use(this._service.createRouter())

    return this._service
  }

  async create({ username, password }) {
    if (username && password) {
      const { count, rows  } = await this.models.users.find({
        where: { username, password }
      })

      if (count > 0) {
        const [{ dataValues: user }] = rows
        const now = Date.now()
        const exp = now + (3600 * 1000)
        const token = jwt.sign({
          userId: user.id,
          type: user.type,
          iat: now,
          exp,
          iss: 'expressjs',
          sub: 'anonymous',
          jwtid: uuidv4()
        }, config.auth.secret)

        return { token }
      }

      throw new CustomError(401, 'Invalid authentication')
    }

    throw new CustomError(401, 'Authentication required')
  }
}
