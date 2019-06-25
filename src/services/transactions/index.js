'use strict'

import ServiceBase from '../../helpers/service-base'
import CustomError from '../../helpers/custom-error'
import hook from './hook'

export default class Service extends ServiceBase {
  constructor(app, models) {
    super('/transactions', models, hook, {})
  }

  static initialize(app, models) {
    if (!this._service) {
      this._service = new Service(app, models)
    }

    app.use(this._service.createRouter())

    return this._service
  }

  async get(id) {
    // Use this to enable get request by Id for 'transactions' model
    return { id }
  }

  async find(params) {
    // Use this to enable get request all data for 'transactions' model
    const results = await this.models.transactions.findAll(params)
    return results
  }

  async create(data) {
    // Use this to enable post request for 'transactions' model
    if (Array.isArray(data)) {
      throw new CustomError(405, 'Not allowed bulk insert')
    }

    const results = await this.models.transactions.create(data)

    return results.dataValues
  }

  async update(id, data, params) {
    // Use this to enable put request for 'transactions' model
    console.log('id', id)
    console.log('data', data)

    return { id, ...data }
  }

  async delete(id, params) {
    // Use this to enable delete request by Id for 'transactions' model
    console.log('id', id)
    return { id }
  }
}
