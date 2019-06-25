'use strict'

import Sequelize from 'sequelize'
import uuidv4 from 'uuidv4'

import ModelBase from '../helpers/model-base'

export default class Model extends ModelBase {
  constructor(dbClient) {
    super(dbClient.define('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM,
        values: ['admin', 'teller', 'customer']
      }
    }))
  }

  static initialize(dbClient) {
    if (!this._model) {
      this._model = new Model(dbClient)
    }

    return this._model
  }
}
