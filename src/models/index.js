'use strict'

import accountsModel from './accounts'
import banksModel from './banks'
import transactionsModel from './transactions'
import usersModel from './users'

export default class Models {
  constructor(dbClient) {
    this._schemas = {
      accounts: accountsModel.initialize(dbClient),
      banks: banksModel.initialize(dbClient),
      transactions: transactionsModel.initialize(dbClient),
      users: usersModel.initialize(dbClient)
    }
  }

  static initialize(dbClient) {
    if (!this._models) {
      this._models = new Models(dbClient)
    }

    return this._models
  }

  static getModels() {
    if (this._models) {
      return this._models._schemas
    }

    throw new Error('Models must be initialized...')
  }

  getModels() {
    return this._schemas
  }
}
