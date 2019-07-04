'use strict'

export default class ModelBase {
  constructor(schema) {
    this._schema = schema
  }

  async get(id) {
    const { dataValues } = id ? (await this._schema.findByPk(id) || {}) : {}
    return dataValues
  }

  async find(params) {
    const { count, rows } = await this._schema.findAndCountAll(params) || {}

    return {
      total: count,
      data: ((count > 0) ? (rows.map(({ dataValues }) => dataValues)) : [])
    }
  }

  async create(data) {
    const { dataValues } = await this._schema.create(data) || {}
    return dataValues
  }

  async update(id, data) {
    const { dataValues } = await this._schema.update(data, {
      where: { id }
    }) || {}

    return dataValues
  }

  async delete(id) {
    const { dataValues } = await this._schema.destroy({
      where: { id }
    }) || {}

    return dataValues
  }
}
