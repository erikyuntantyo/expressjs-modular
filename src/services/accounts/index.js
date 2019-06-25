'use strict'

import ServiceBase from '../../helpers/service-base'
import CustomError from '../../helpers/custom-error'
import hook from './hook'

export default class Service extends ServiceBase {
  constructor(app, models) {
    super('/accounts', models, hook, {})
  }

  static initialize(app, models) {
    if (!this._service) {
      this._service = new Service(app, models)
    }

    app.use(this._service.createRouter())

    return this._service
  }

  async get(id) {
    // Use this to enable get request by Id for 'accounts' model
    return await this.models.accounts.get(id)
  }

  async find(params) {
    // Use this to enable get request all data for 'accounts' model
    return await this.models.accounts.find(params)
  }

  async create(data) {
    // Use this to enable post request for 'accounts' model
    if (Array.isArray(data)) {
      throw new CustomError(405, 'Not allowed bulk insert')
    }

    return await this.models.accounts.create(data)
  }

  async update(id, data) {
    // Use this to enable put request for 'accounts' model
    return await this.models.accounts.update(id, data)
  }

  async delete(id) {
    // Use this to enable delete request by Id for 'accounts' model
    return await this.models.accounts.delete(id)
  }
}
