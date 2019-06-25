'use strict'

import Sequelize from 'sequelize'

export default class dbClient {
  constructor({ name, username, password, host, dialect }) {
    this._connection = new Sequelize(name, username, password, { host, dialect })
  }

  static initialize(config) {
    if (!this._dbClient) {
      this._dbClient = new dbClient(config)
    }

    // Change force to true in the config to reset the database
    return this._dbClient._connection.sync({ force: config.force })
  }

  static connection() {
    if (this._dbClient) {
      return this._dbClient._connection
    }

    throw new Error('Database must be synchronized first before use...')
  }
}
