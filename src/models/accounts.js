'use strict'

import Sequelize from 'sequelize'
import uuidv4 from 'uuidv4'

import ModelBase from '../helpers/model-base'

export default class Model extends ModelBase {
  constructor(dbClient) {
    super(dbClient.define('accounts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
      },
      accountNumber: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true
      },
      bankId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      address: {
        type: Sequelize.STRING(512),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
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
