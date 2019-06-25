'use strict'

import chalk from 'chalk'
import config from 'config'

import App from './app'

App.initialize(config.server.port, () => {
  console.log(`App listen on port ${chalk.red.bold(config.server.port)}`)
})
