'use strict'

import AccountsService from './accounts'
import BanksService from './banks'
import TransactionsService from './transactions'
import UsersService from './users'

export default class Services {
  constructor(app, models) {
    AccountsService.initialize(app, models)
    BanksService.initialize(app, models)
    TransactionsService.initialize(app, models)
    UsersService.initialize(app, models)
  }

  static initialize(app, models) {
    if (!this._services) {
      this._services = new Services(app, models)
    }

    return this._services
  }
}
