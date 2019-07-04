'use strict'

import bcrypt from 'bcrypt'
import config from 'config'
import Sequelize from 'sequelize'
import Models from './models'

export default class dbClient {
  constructor() {
    const { name, username, password, host, dialect } = config.db
    this._connection = new Sequelize(name, username, password, { host, dialect })
  }

  static async initialize() {
    if (!this._dbClient) {
      this._dbClient = new dbClient()
    }

    // Change force to true in the config to reset the database
    await this._dbClient._connection.sync({ force: config.db.reset })

    if (config.db.reset) {
      await Models.getModels().users.create({
        username: 'admin',
        email: config.admin.email,
        password: bcrypt.hashSync('qweasd123', 10),
        role: 'admin'
      })
    }

    console.log('Database initialized')
  }

  static connection() {
    if (this._dbClient) {
      return this._dbClient._connection
    }

    throw new Error('Database must be synchronized first before use...')
  }
}
