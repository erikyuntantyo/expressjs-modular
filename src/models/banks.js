'use strict'

import Sequelize from 'sequelize'
import uuidv4 from 'uuidv4'

import ModelBase from '../helpers/model-base'

export default class Model extends ModelBase {
  constructor(dbClient) {
    super(dbClient.define('banks', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      enable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
