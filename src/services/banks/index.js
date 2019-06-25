'use strict'

import ServiceBase from '../../helpers/service-base'
import CustomError from '../../helpers/custom-error'
import hook from './hook'

export default class Service extends ServiceBase {
  constructor(app, models) {
    super('/banks', models, hook, {})
  }

  static initialize(app, models) {
    if (!this._service) {
      this._service = new Service(app, models)
    }

    app.use(this._service.createRouter())

    return this._service
  }

  async get(id) {
    // Use this to enable get request by Id for 'banks' model
    return { id }
  }

  async find(params) {
    // Use this to enable get request all data for 'banks' model
    const results = await this.models.banks.findAll()
    return results
  }

  async create(data) {
    // Use this to enable post request for 'banks' model
    if (Array.isArray(data)) {
      throw new CustomError(405, 'Not allowed bulk insert')
    }

    const results = await this.models.banks.create(data)

    return results.dataValues
  }

  async update(id, data, params) {
    // Use this to enable put request for 'banks' model
    console.log('id', id)
    console.log('data', data)

    return { id, ...data }
  }

  async delete(id, params) {
    // Use this to enable delete request by Id for 'banks' model
    console.log('id', id)
    return { id }
  }
}
