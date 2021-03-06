'use strict'

import bcrypt from 'bcrypt'
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
      const { data, total } = await this.models.users.find({
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
            sub: 'anonymous',
            jwtid: uuidv4()
          }, config.auth.secret)

          return { token, resetKey }
        }
      }

      throw new CustomError(401, 'Invalid authentication')
    }

    throw new CustomError(401, 'Authentication required')
  }
}
