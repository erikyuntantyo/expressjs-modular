'use strict'

import bodyParser from 'body-parser'
import config from 'config'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express from 'express'
import graphQLHttp from 'express-graphql'
import methodOverride from 'method-override'

import DBClient from './sequelize'
import Models from './models'
import Services from './services'

import graphQLSchema from './graphql-schema'

export default class App {
  constructor() {
    this._server = express()

    this._server.use(bodyParser.urlencoded({ extended: true }))
    this._server.use(bodyParser.json())
    this._server.use(methodOverride())
    this._server.use(cors())
    this._server.use(errorHandler())

    this._server.get('/test', (req, res) => res.status(200).json({ responseCode: 200, message: 'Hi, I am alive...' }).end())

    DBClient.initialize(config.db).then(() => console.log('Database initialized...'))
    Services.initialize(this._server, Models.initialize(DBClient.connection()).getModels())

    this._server.use('/graphql', graphQLHttp({
      schema: graphQLSchema,
      graphiql: true
    }))

    this._server.use((req, res) => res.status(404).send('Route doesn\'t exist.').end())
  }

  static initialize(port, onListen) {
    if (!this.app) {
      this.app = new App()
    }

    return this.app._server.listen(port, onListen)
  }
}
