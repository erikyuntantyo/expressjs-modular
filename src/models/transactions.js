'use strict'

import Sequelize from 'sequelize'
import uuidv4 from 'uuidv4'

import ModelBase from '../helpers/model-base'

export default class Model extends ModelBase {
  constructor(dbClient) {
    super(dbClient.define('transactions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: ['DB', 'CR', 'TRF'],
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
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
