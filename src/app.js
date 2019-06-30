'use strict'

import bodyParser from 'body-parser'
import config from 'config'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express from 'express'
import graphQLHttp from 'express-graphql'
import methodOverride from 'method-override'

import DBClient from './sequelize'
import { GraphQLInternalServerError } from './helpers/graphql-custom-errors'
import Models from './models'
import schema from './graphql-schema'
import Services from './services'

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

    this._server.use('/graphql', graphQLHttp((req) => ({
      schema,
      graphiql: true,
      context: { ...req },
      customFormatErrorFn: error => {
        if (error && error.originalError) {
          return {
            statusCode: error.originalError.statusCode,
            ...error
          }
        }

        return new GraphQLInternalServerError()
      }
    })))

    this._server.use((req, res) => res.status(404).send('Route doesn\'t exist.').end())
  }

  static initialize(port, onListen) {
    if (!this.app) {
      this.app = new App()
    }

    return this.app._server.listen(port, onListen)
  }
}
