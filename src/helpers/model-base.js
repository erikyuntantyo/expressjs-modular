'use strict'

export default class ModelBase {
  constructor(schema) {
    this._schema = schema
  }

  get(id) {
    return this._schema.findByPK(id)
  }

  find(params) {
    return this._schema.findAndCountAll(params)
  }

  create(data) {
    return this._schema.create(data)
  }

  update(id, data, params) {
    return this._schema.update(data, {
      where: { id }
    })
  }

  delete(id) {
    return this._schema.destroy({
      where: { id }
    })
  }
}
